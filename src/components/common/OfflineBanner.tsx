import React from 'react';
import { useApp } from '../../context/AppContext';
import { WifiOff, RefreshCw } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOffline, setIsOffline, addToast } = useApp();

  if (!isOffline) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-amber-800 dark:text-amber-300 text-xs sm:text-sm flex items-center justify-between">
      <div className="flex items-center gap-2 max-w-4xl mx-auto w-full justify-between">
        <div className="flex items-center gap-2">
          <WifiOff className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 animate-pulse" />
          <span>
            <strong>Offline Mode Active:</strong> You are browsing cached microservices and local project workspaces.
          </span>
        </div>
        <button
          onClick={() => {
            setIsOffline(false);
            addToast('Connection Restored', 'Back online with real-time websocket sync.', 'success');
          }}
          className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition-colors text-xs shrink-0"
        >
          <RefreshCw className="w-3 h-3" />
          Reconnect
        </button>
      </div>
    </div>
  );
};
