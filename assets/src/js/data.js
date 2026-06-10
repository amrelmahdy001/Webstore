export const wordList = ['brand', 'portfolio', 'market'];

// Each set: array of { iconPath, label, color? }
export const iconSets = [
  [ // brand
    { iconPath: `<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/>`, label: 'Creative', color: '#a07cf8' },
    { iconPath: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`, label: 'Premium', color: '#a07cf8' },
    { iconPath: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`, label: 'Trust', color: '#a07cf8' },
    { iconPath: `<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>`, label: 'Layers', color: '#a07cf8' },
    { iconPath: `<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>`, label: 'Identity', color: '#e06bba' },
    { iconPath: `<circle cx="13.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="14" r="2.5" stroke="#f97316"/><circle cx="17" cy="15" r="2.5" stroke="#e06bba"/>`, label: 'Colors', color: '#a07cf8' }
  ],
  [ // portfolio
    { iconPath: `<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>`, label: 'Showcase', color: '#f472b6' },
    { iconPath: `<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>`, label: 'Visual', color: '#f472b6' },
    { iconPath: `<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`, label: 'Done', color: '#f472b6' },
    { iconPath: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`, label: 'Code', color: '#f472b6' },
    { iconPath: `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`, label: 'Preview', color: '#f472b6' },
    { iconPath: `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>`, label: 'Clients', color: '#f472b6' }
  ],
  [ // market
    { iconPath: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`, label: 'Growth', color: '#f97316' },
    { iconPath: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`, label: 'Target', color: '#f97316' },
    { iconPath: `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`, label: 'Reach', color: '#f97316' },
    { iconPath: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>`, label: 'Global', color: '#f97316' },
    { iconPath: `<path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>`, label: 'Launch', color: '#f97316' },
    { iconPath: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`, label: 'Impact', color: '#f97316' }
  ]
];