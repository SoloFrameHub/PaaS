'use client'

import Tooltip from '@/components/tooltip'
import BarChart02 from '@/components/charts/bar-chart-02'

// Import utilities
import { getCssVariable } from '@/components/utils/utils'

export default function DashboardCard09() {

  const chartData = {
    labels: [
      '09-01-2025', '10-01-2025', '11-01-2025',
      '12-01-2025', '01-01-2026', '02-01-2026',
    ],
    datasets: [
      // Completions (positive bars)
      {
        label: 'Completions',
        data: [
          142, 168, 155, 178, 124, 189,
        ],
        backgroundColor: getCssVariable('--color-primary-500'),
        hoverBackgroundColor: getCssVariable('--color-primary-600'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      // Drop-offs (negative bars)
      {
        label: 'Drop-offs',
        data: [
          -38, -25, -42, -31, -55, -18,
        ],
        backgroundColor: getCssVariable('--color-primary-200'),
        hoverBackgroundColor: getCssVariable('--color-primary-300'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  }

  return(
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Completions VS Drop-offs</h2>
        <Tooltip className="ml-2" size="lg">
          <div className="text-sm">Tracks course completions against learners who paused or left a course.</div>
        </Tooltip>
      </header>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">+747</div>
          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+12%</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart02 data={chartData} width={595} height={248} />
      </div>
    </div>
  )
}
