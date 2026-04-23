'use client'

import LineChart02 from '@/components/charts/line-chart-02'

// Import utilities
import { getCssVariable } from '@/components/utils/utils'

export default function DashboardCard08() {

  const chartData = {
    labels: [
      '01-01-2025', '02-01-2025', '03-01-2025',
      '04-01-2025', '05-01-2025', '06-01-2025',
      '07-01-2025', '08-01-2025', '09-01-2025',
      '10-01-2025', '11-01-2025', '12-01-2025',
      '01-01-2026', '02-01-2026',
    ],
    datasets: [
      // Indigo line — avg wellness score (current cohort)
      {
        label: 'Current',
        data: [
          58, 61, 63, 65, 68, 70,
          72, 74, 76, 78, 80, 82,
          84, 86,
        ],
        borderColor: getCssVariable('--color-primary-500'),
        fill: false,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: getCssVariable('--color-primary-500'),
        pointHoverBackgroundColor: getCssVariable('--color-primary-500'),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
      // Blue line — avg wellness score (previous cohort)
      {
        label: 'Previous',
        data: [
          52, 54, 55, 57, 59, 60,
          62, 63, 65, 66, 68, 70,
          71, 73,
        ],
        borderColor: getCssVariable('--color-sky-500'),
        fill: false,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: getCssVariable('--color-sky-500'),
        pointHoverBackgroundColor: getCssVariable('--color-sky-500'),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,        
        clip: 20,
        tension: 0.2,
      },
      // Green line — platform-wide average wellness score
      {
        label: 'Average',
        data: [
          55, 57, 58, 60, 62, 64,
          66, 67, 69, 71, 73, 75,
          77, 78,
        ],
        borderColor: getCssVariable('--color-green-500'),
        fill: false,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: getCssVariable('--color-green-500'),
        pointHoverBackgroundColor: getCssVariable('--color-green-500'),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,        
        clip: 20,
        tension: 0.2,
      },
    ],
  }

  return(
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Wellness Progress Over Time</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <LineChart02 data={chartData} width={595} height={248} />
    </div>
  )
}
