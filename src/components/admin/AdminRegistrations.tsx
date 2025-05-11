import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { ChevronLeft, Search, Filter, Download, Eye, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Registration {
  id: string;
  type: 'solo' | 'duo' | 'squad';
  teamName: string;
  players: string;
  uids: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
}

const columnHelper = createColumnHelper<Registration>();

const AdminRegistrations = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Mock data
  const data: Registration[] = [
    {
      id: '1',
      type: 'squad',
      teamName: 'Phoenix Raiders',
      players: 'John, Mike, Sarah, Alex',
      uids: '123456, 234567, 345678, 456789',
      timestamp: '2024-03-15 14:30',
      status: 'approved',
    },
    {
      id: '2',
      type: 'duo',
      teamName: 'Dynamic Duo',
      players: 'Emma, James',
      uids: '567890, 678901',
      timestamp: '2024-03-15 15:45',
      status: 'pending',
    },
    {
      id: '3',
      type: 'solo',
      teamName: '-',
      players: 'David',
      uids: '789012',
      timestamp: '2024-03-15 16:15',
      status: 'rejected',
    },
  ];

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: info => (
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${info.getValue() === 'squad' ? 'bg-purple-500/20 text-purple-400' :
            info.getValue() === 'duo' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-green-500/20 text-green-400'}
        `}>
          {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
        </span>
      ),
    }),
    columnHelper.accessor('teamName', {
      header: 'Team/Player Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('players', {
      header: 'Players',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('uids', {
      header: 'Game UIDs',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('timestamp', {
      header: 'Registered On',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${info.getValue() === 'approved' ? 'bg-green-500/20 text-green-400' :
            info.getValue() === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'}
        `}>
          {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: () => (
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Eye className="w-4 h-4" />
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search registrations..."
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          
          <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-gray-700">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-sm font-medium text-gray-300"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <ArrowUpDown className="w-4 h-4" />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRegistrations;