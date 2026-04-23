'use client'

import EditMenu from '@/components/edit-menu'
import dynamic from 'next/dynamic'

const LineChart01 = dynamic(() => import('@/components/charts/line-chart-01'), {
  ssr: false,
  loading: () => <div className="h-[128px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl" />
})

import { chartAreaGradient } from '@/components/charts/chartjs-config'

// Import utilities
import { adjustColorOpacity, getCssVariable } from '@/components/utils/utils'

export default function DashboardCard01() {

  const chartData = {
    labels: [
      '01-01-2025', '02-01-2025', '03-01-2025',
      '04-01-2025', '05-01-2025', '06-01-2025',
      '07-01-2025', '08-01-2025', '09-01-2025',
      '10-01-2025', '11-01-2025', '12-01-2025',
      '01-01-2026', '02-01-2026',
    ],
    datasets: [
      // Primary line — monthly mindfulness sessions
      {
        data: [
          122, 135, 148, 141, 156, 163,
          158, 172, 189, 201, 218, 230,
          241, 247,
        ],
        fill: true,
        backgroundColor: function (context: { chart: { ctx: CanvasRenderingContext2D; chartArea: any } }) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
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
      // Gray line — previous period sessions
      {
        data: [
          95, 102, 98, 110, 108, 115,
          121, 118, 130, 142, 138, 155,
          160, 168,
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

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Mindfulness</h2>
          {/* Menu button */}
          <EditMenu align="right" />
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sessions Completed</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">247</div>
          <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart01 data={chartData} width={389} height={128} />
      </div>
    </div>
  )
}
