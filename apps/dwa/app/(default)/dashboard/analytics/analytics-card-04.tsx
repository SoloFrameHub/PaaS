'use client'

import BarChart04 from '@/components/charts/bar-chart-04'

// Import utilities
import { getCssVariable } from '@/components/utils/utils'

export default function AnalyticsCard04() {

  const chartData = {
    labels: [
      '11-01-2025', '12-01-2025', '01-01-2026', '02-01-2026',
    ],
    datasets: [
      // Indigo bars
      {
        label: 'New Learners',
        data: [
          185, 210, 245, 280,
        ],
        backgroundColor: getCssVariable('--color-primary-500'),
        hoverBackgroundColor: getCssVariable('--color-primary-600'),
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      // Sky bars
      {
        label: 'Returning Learners',
        data: [
          320, 340, 290, 365,
        ],
        backgroundColor: getCssVariable('--color-sky-500'),
        hoverBackgroundColor: getCssVariable('--color-sky-600'),
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  }

  return(
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">New vs Returning Learners</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart04 data={chartData} width={595} height={248} />
    </div>
  )
}
