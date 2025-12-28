import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // User state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : { id: 1, name: 'Admin User', role: 'admin', email: 'admin@example.com' };
  });

  // Assets state
  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem('assets');
    return saved ? JSON.parse(saved) : [];
  });

  // Tasks state
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // Members state
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('members');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Admin User', role: 'admin', email: 'admin@example.com' },
      { id: 2, name: 'John Smith', role: 'member', email: 'john@example.com' },
      { id: 3, name: 'Sarah Johnson', role: 'member', email: 'sarah@example.com' },
    ];
  });

  // Maintenance records state
  const [maintenanceRecords, setMaintenanceRecords] = useState(() => {
    const saved = localStorage.getItem('maintenanceRecords');
    return saved ? JSON.parse(saved) : [];
  });

  // Contracts state
  const [contracts, setContracts] = useState(() => {
    const saved = localStorage.getItem('contracts');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('maintenanceRecords', JSON.stringify(maintenanceRecords));
  }, [maintenanceRecords]);

  useEffect(() => {
    localStorage.setItem('contracts', JSON.stringify(contracts));
  }, [contracts]);

  // Asset operations
  const addAsset = (asset) => {
    const newAsset = {
      ...asset,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      createdBy: currentUser.name,
      status: 'active',
    };
    setAssets([...assets, newAsset]);
    return newAsset;
  };

  const updateAsset = (id, updates) => {
    setAssets(assets.map(asset =>
      asset.id === id ? { ...asset, ...updates, updatedAt: new Date().toISOString() } : asset
    ));
  };

  const deleteAsset = (id) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const transferAsset = (assetId, fromLocation, toLocation, transferredBy, notes) => {
    updateAsset(assetId, {
      location: toLocation,
      lastTransfer: {
        from: fromLocation,
        to: toLocation,
        date: new Date().toISOString(),
        by: transferredBy,
        notes,
      },
    });
  };

  const disposeAsset = (assetId, reason, disposedBy, notes) => {
    updateAsset(assetId, {
      status: 'disposed',
      disposalInfo: {
        date: new Date().toISOString(),
        reason,
        by: disposedBy,
        notes,
      },
    });
  };

  // Task operations
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      createdBy: currentUser.name,
      status: 'pending',
    };
    setTasks([...tasks, newTask]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Maintenance operations
  const addMaintenanceRecord = (record) => {
    const newRecord = {
      ...record,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setMaintenanceRecords([...maintenanceRecords, newRecord]);
    return newRecord;
  };

  const updateMaintenanceRecord = (id, updates) => {
    setMaintenanceRecords(maintenanceRecords.map(record =>
      record.id === id ? { ...record, ...updates } : record
    ));
  };

  const deleteMaintenanceRecord = (id) => {
    setMaintenanceRecords(maintenanceRecords.filter(record => record.id !== id));
  };

  // Contract operations
  const addContract = (contract) => {
    const newContract = {
      ...contract,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setContracts([...contracts, newContract]);
    return newContract;
  };

  const updateContract = (id, updates) => {
    setContracts(contracts.map(contract =>
      contract.id === id ? { ...contract, ...updates } : contract
    ));
  };

  const deleteContract = (id) => {
    setContracts(contracts.filter(contract => contract.id !== id));
  };

  const value = {
    currentUser,
    setCurrentUser,
    assets,
    addAsset,
    updateAsset,
    deleteAsset,
    transferAsset,
    disposeAsset,
    tasks,
    addTask,
    updateTask,
    deleteTask,
    members,
    setMembers,
    maintenanceRecords,
    addMaintenanceRecord,
    updateMaintenanceRecord,
    deleteMaintenanceRecord,
    contracts,
    addContract,
    updateContract,
    deleteContract,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
