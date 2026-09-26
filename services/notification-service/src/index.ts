import http from 'node:http';
import { URL } from 'node:url';

interface NotificationPayload {
  id: string;
  category: 'Orders' | 'Messages' | 'Projects' | 'Payments' | 'Reviews' | 'System';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  userId: string;
}

// In-memory notifications store
const notificationsQueue: NotificationPayload[] = [
  {
    id: 'notif-1',
    category: 'Orders',
    title: 'Milestone Submitted for Review',
    message: 'Elena Rostova submitted Milestone 2 deliverables on Project #101.',
    timestamp: '25 mins ago',
    isRead: false,
    userId: 'client-1'
  },
  {
    id: 'notif-2',
    category: 'Payments',
    title: 'Escrow Funds Secured',
    message: '$650.00 escrow is held safely for Milestone 2 on BioPulse Health.',
    timestamp: '1 day ago',
    isRead: true,
    userId: 'client-1'
  }
];

const PORT = 8003;

const server = http.createServer((req, res) => {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const reqUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  // 1. Kubernetes Probes Endpoints
  if (reqUrl.pathname === '/healthz' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      service: 'notification-service',
      runtime: 'node-26-typescript',
      uptime_seconds: process.uptime(),
      memory_usage_mb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
    }));
    return;
  }

  if (reqUrl.pathname === '/readyz' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ready',
      active_connections: 1,
      buffered_notifications: notificationsQueue.length
    }));
    return;
  }

  // 2. Notifications REST Endpoints
  if (reqUrl.pathname === '/api/v1/notifications' && req.method === 'GET') {
    const categoryFilter = reqUrl.searchParams.get('category');
    const filtered = categoryFilter && categoryFilter !== 'All'
      ? notificationsQueue.filter((n) => n.category === categoryFilter)
      : notificationsQueue;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(filtered));
    return;
  }

  if (reqUrl.pathname === '/api/v1/notifications/send' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const newNotif: NotificationPayload = {
          id: `notif-${Date.now()}`,
          category: payload.category || 'System',
          title: payload.title || 'New Platform Event',
          message: payload.message || '',
          timestamp: 'Just now',
          isRead: false,
          userId: payload.userId || 'broadcast'
        };

        notificationsQueue.unshift(newNotif);
        console.log(`[Notification Service] Dispatched event: "${newNotif.title}"`);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, notification: newNotif }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // Fallback 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`[Taskora] Node.js/TypeScript Notification Microservice listening on port ${PORT}...`);
});
