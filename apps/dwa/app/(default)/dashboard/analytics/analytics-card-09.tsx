'use client'

import DoughnutChart from '@/components/charts/doughnut-chart'

// Import utilities
import { getCssVariable } from '@/components/utils/utils'

export default function AnalyticsCard09() {

  const chartData = {
    labels: ['18-24', '25-34', '35-49', '50+'],
    datasets: [
      {
        label: 'Learners By Age Group',
        data: [
          28, 38, 22, 12,
        ],
        backgroundColor: [
          getCssVariable('--color-primary-500'),
          getCssVariable('--color-sky-500'),
          getCssVariable('--color-red-500'),
          getCssVariable('--color-green-500'),
        ],
        hoverBackgroundColor: [
          getCssVariable('--color-primary-600'),
          getCssVariable('--color-sky-600'),
          getCssVariable('--color-red-600'),
          getCssVariable('--color-green-600'),
        ],
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Learners By Age Group</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  )
}
