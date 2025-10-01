// Centralized mock data for ITSM lists

export const mockOpenEvents = [
  { id: 'EVT-2101', incidentId: 'INC-1042', sev: 'Critical', source: 'node-3', message: 'CPU usage > 95%', time: '3m ago', partner: 'TechCorp', client: 'Enterprise Solutions', entity: 'Production Cluster' },
  { id: 'EVT-2100', incidentId: 'INC-1039', sev: 'High', source: 'db-primary', message: 'Disk space < 10%', time: '9m ago', partner: 'DataFlow Inc', client: 'Global Retail', entity: 'Database Server' },
  { id: 'EVT-2099', incidentId: 'INC-1036', sev: 'Medium', source: 'payments', message: 'Service restart detected', time: '14m ago', partner: 'PayTech', client: 'E-commerce Plus', entity: 'Payment Gateway' },
  { id: 'EVT-2098', incidentId: null, sev: 'Low', source: 'nginx', message: 'Config change applied', time: '20m ago', partner: 'WebServ', client: 'Digital Agency', entity: 'Load Balancer' },
  { id: 'EVT-2097', incidentId: 'INC-1042', sev: 'High', source: 'api-gw', message: 'Latency p95 > 800ms', time: '30m ago', partner: 'APIGate', client: 'Mobile Apps Co', entity: 'API Gateway' },
  { id: 'EVT-2096', incidentId: null, sev: 'Medium', source: 'redis', message: 'Connection pool saturation', time: '42m ago', partner: 'CacheTech', client: 'Social Media Inc', entity: 'Cache Cluster' },
  { id: 'EVT-2095', incidentId: null, sev: 'Low', source: 'backup', message: 'Backup completed', time: '55m ago', partner: 'BackupPro', client: 'Financial Services', entity: 'Backup System' },
  { id: 'EVT-2094', incidentId: 'INC-1041', sev: 'Critical', source: 'node-5', message: 'Kernel panic detected', time: '1h ago', partner: 'ServerTech', client: 'Cloud Provider', entity: 'Compute Node' },
  { id: 'EVT-2093', incidentId: 'INC-1039', sev: 'High', source: 'db-replica', message: 'Replication lag > 10s', time: '1h ago', partner: 'DataFlow Inc', client: 'Global Retail', entity: 'Replica Server' },
  { id: 'EVT-2092', incidentId: null, sev: 'Medium', source: 'kafka', message: 'Consumer group rebalancing', time: '2h ago', partner: 'StreamTech', client: 'IoT Solutions', entity: 'Message Queue' }
];

export const mockEventsHistory = [
  { id: 'EVT-2050', incidentId: 'INC-1038', sev: 'Critical', source: 'node-2', message: 'OOM kill', state: 'Resolved', ended: '2025-05-01 10:12', partner: 'ServerTech', client: 'Cloud Provider', entity: 'Compute Node' },
  { id: 'EVT-2049', incidentId: 'INC-1039', sev: 'High', source: 'db-primary', message: 'Locks spike', state: 'Resolved', ended: '2025-05-01 09:56', partner: 'DataFlow Inc', client: 'Global Retail', entity: 'Database Server' },
  { id: 'EVT-2048', incidentId: null, sev: 'Medium', source: 'cdn', message: 'Increased 4xx', state: 'Resolved', ended: '2025-04-30 21:05', partner: 'CDNPro', client: 'Content Platform', entity: 'CDN Edge' },
  { id: 'EVT-2047', incidentId: null, sev: 'Low', source: 'scheduler', message: 'Job skipped', state: 'Closed', ended: '2025-04-30 18:22', partner: 'JobTech', client: 'Automation Corp', entity: 'Scheduler Service' },
  { id: 'EVT-2046', incidentId: 'INC-1042', sev: 'Medium', source: 'api-gw', message: 'Config reload', state: 'Closed', ended: '2025-04-30 12:40', partner: 'APIGate', client: 'Mobile Apps Co', entity: 'API Gateway' }
];

export const mockIncidents = [
  { id: 'INC-1042', title: 'API latency spikes', prio: 'High', status: 'In Progress', assignee: 'you', openedAt: '2025-05-01 09:10', updatedAt: '5m ago', partner: 'APIGate', client: 'Mobile Apps Co', entity: 'API Gateway' },
  { id: 'INC-1041', title: 'Email service outage', prio: 'Critical', status: 'Investigating', assignee: 'jkim', openedAt: '2025-05-01 08:34', updatedAt: '14m ago', partner: 'EmailTech', client: 'Communication Corp', entity: 'Email Service' },
  { id: 'INC-1040', title: 'Search results stale', prio: 'Medium', status: 'Monitoring', assignee: 'you', openedAt: '2025-04-30 19:22', updatedAt: '22m ago', partner: 'SearchPro', client: 'E-commerce Plus', entity: 'Search Engine' },
  { id: 'INC-1039', title: 'DB connection errors', prio: 'Medium', status: 'Monitoring', assignee: 'mnovak', openedAt: '2025-04-30 16:15', updatedAt: '31m ago', partner: 'DataFlow Inc', client: 'Global Retail', entity: 'Database Server' },
  { id: 'INC-1038', title: 'Login failures via SSO', prio: 'High', status: 'In Progress', assignee: 'schen', openedAt: '2025-04-30 11:05', updatedAt: '1h ago', partner: 'AuthTech', client: 'Enterprise Solutions', entity: 'SSO Service' },
  { id: 'INC-1037', title: 'Webhook delivery delays', prio: 'Low', status: 'Backlog', assignee: 'you', openedAt: '2025-04-29 13:05', updatedAt: '2h ago', partner: 'WebhookPro', client: 'Integration Corp', entity: 'Webhook Service' },
  { id: 'INC-1036', title: 'Payments timeout occasional', prio: 'High', status: 'In Progress', assignee: 'araj', openedAt: '2025-04-29 08:54', updatedAt: '3h ago', partner: 'PayTech', client: 'E-commerce Plus', entity: 'Payment Gateway' },
  { id: 'INC-1035', title: 'Mobile app crash on start', prio: 'Critical', status: 'Investigating', assignee: 'you', openedAt: '2025-04-28 20:00', updatedAt: '4h ago', partner: 'MobileTech', client: 'Mobile Apps Co', entity: 'Mobile App' }
];

export const severityToBadge = (sev) =>
  sev === 'Critical' ? 'bg-danger-main' : sev === 'High' ? 'bg-warning-main' : sev === 'Medium' ? 'bg-info' : 'bg-neutral-400';

export const priorityToBadge = (prio) =>
  prio === 'Critical' ? 'bg-danger-main' : prio === 'High' ? 'bg-warning-main' : prio === 'Medium' ? 'bg-info' : 'bg-neutral-400';

