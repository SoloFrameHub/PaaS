'use client'

import BarChart03 from '@/components/charts/bar-chart-03'

// Import utilities
import { getCssVariable } from '@/components/utils/utils'

export default function AnalyticsCard03() {

  const chartData = {
    labels: [
      '09-01-2025', '10-01-2025', '11-01-2025',
      '12-01-2025', '01-01-2026', '02-01-2026',
    ],
    datasets: [
      // Stack — word of mouth / direct
      {
        label: 'Direct',
        data: [
          120, 135, 140, 155, 170, 185,
        ],
        backgroundColor: getCssVariable('--color-primary-700'),
        hoverBackgroundColor: getCssVariable('--color-primary-800'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      // Stack — therapist / counselor referrals
      {
        label: 'Referral',
        data: [
          85, 92, 110, 105, 128, 135,
        ],
        backgroundColor: getCssVariable('--color-primary-500'),
        hoverBackgroundColor: getCssVariable('--color-primary-600'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      // Stack — organic search
      {
        label: 'Organic Search',
        data: [
          65, 72, 80, 88, 95, 108,
        ],
        backgroundColor: getCssVariable('--color-primary-300'),
        hoverBackgroundColor: getCssVariable('--color-primary-400'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      // Stack — social / community
      {
        label: 'Social',
        data: [
          45, 55, 62, 58, 70, 78,
        ],
        backgroundColor: getCssVariable('--color-primary-100'),
        hoverBackgroundColor: getCssVariable('--color-primary-200'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  }

  return(
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Enrollment Sources</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart03 data={chartData} width={595} height={248} />
    </div>
  )
}
