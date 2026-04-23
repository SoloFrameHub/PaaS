'use client'

import BarChart01 from '@/components/charts/bar-chart-01'

// Import utilities
import { getCssVariable } from '@/components/utils/utils'

export default function DashboardCard04() {

  const chartData = {
    labels: [
      '09-01-2025', '10-01-2025', '11-01-2025',
      '12-01-2025', '01-01-2026', '02-01-2026',
    ],
    datasets: [
      // Light blue bars
      {
        label: 'Self-Guided',
        data: [
          180, 220, 195, 240, 265, 280,
        ],
        backgroundColor: getCssVariable('--color-sky-500'),
        hoverBackgroundColor: getCssVariable('--color-sky-600'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      // Indigo bars
      {
        label: 'Coached',
        data: [
          85, 110, 98, 125, 140, 155,
        ],
        backgroundColor: getCssVariable('--color-primary-500'),
        hoverBackgroundColor: getCssVariable('--color-primary-600'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  }

  return(
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Self-Guided VS Coached</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart01 data={chartData} width={595} height={248} />
    </div>
  )
}
