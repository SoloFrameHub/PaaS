'use client'

import LineChart03 from '@/components/charts/line-chart-03'
import { chartAreaGradient } from '@/components/charts/chartjs-config'

// Import utilities
import { adjustColorOpacity, getCssVariable } from '@/components/utils/utils'

export default function AnalyticsCard01() {

  const chartData = {
    labels: [
      '01-01-2025', '02-01-2025', '03-01-2025',
      '04-01-2025', '05-01-2025', '06-01-2025',
      '07-01-2025', '08-01-2025', '09-01-2025',
      '10-01-2025', '11-01-2025', '12-01-2025',
      '01-01-2026', '02-01-2026',
    ],
    datasets: [
      // Primary line — current period learning sessions
      {
        label: 'Current',
        data: [
          820, 940, 1050, 1120, 1280, 1350,
          1420, 1580, 1690, 1810, 1920, 2040,
          2180, 2310,
        ],
        fill: true,
        backgroundColor: function(context: any) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          const gradientOrColor = chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: adjustColorOpacity(getCssVariable('--color-primary-500'), 0) },
            { stop: 1, color: adjustColorOpacity(getCssVariable('--color-primary-500'), 0.2) }
          ]);
          return gradientOrColor || 'transparent';
        },     
        borderColor: getCssVariable('--color-primary-500'),
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
      // Gray line — previous period learning sessions
      {
        label: 'Previous',
        data: [
          580, 620, 710, 750, 830, 890,
          960, 1020, 1100, 1180, 1240, 1320,
          1410, 1490,
        ],
        borderColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.25),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.25),
        pointHoverBackgroundColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.25),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,        
        clip: 20,
        tension: 0.2,
      },
    ],
  }

  return(
    <div className="flex flex-col col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Learning Analytics</h2>
      </header>
      <div className="px-5 py-1">
        <div className="flex flex-wrap max-sm:*:w-1/2">
          {/* Active Learners */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">2.3K</div>
                <div className="text-sm font-medium text-green-600">+55%</div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Active Learners</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-700 mr-5" aria-hidden="true"></div>
          </div>
          {/* Total Sessions */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">18.4K</div>
                <div className="text-sm font-medium text-green-600">+32%</div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Sessions</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-700 mr-5" aria-hidden="true"></div>
          </div>
          {/* Completion Rate */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">78%</div>
                <div className="text-sm font-medium text-green-600">+12%</div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-700 mr-5" aria-hidden="true"></div>
          </div>
          {/* Avg Session Length */}
          <div className="flex items-center">
            <div>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">14m 22s</div>
                <div className="text-sm font-medium text-green-600">+18%</div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Avg Session Length</div>
            </div>
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart03 data={chartData} width={800} height={300} />
      </div>
    </div>
  )
}
