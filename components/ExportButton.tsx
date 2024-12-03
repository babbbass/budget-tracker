"use client"
import React from "react"
import { Download, Upload } from "lucide-react"
import {
  exportToExcel,
  exportToPDF,
  exportToWord,
  CategoryType,
} from "@/lib/utils/export"
import { Button } from "./ui/button"

interface ExportButtonProps {
  budgets: CategoryType[]
}

export const ExportButton: React.FC<ExportButtonProps> = ({ budgets }) => {
  return (
    <div className='relative inline-block'>
      <div className='group'>
        <Button className='flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-[#0d6b55] transition-colors duration-200 text-xs'>
          <Upload size={16} />
          <span>Exporter</span>
        </Button>

        <div className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 invisible group-hover:visible'>
          <div className='py-1' role='menu'>
            <button
              onClick={() => exportToExcel(budgets)}
              className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              role='menuitem'
            >
              Exporter en Excel
            </button>
            <button
              onClick={() => exportToPDF(budgets)}
              className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              role='menuitem'
            >
              Exporter en PDF
            </button>
            <button
              onClick={() => exportToWord(budgets)}
              className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              role='menuitem'
            >
              Exporter en Word
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
