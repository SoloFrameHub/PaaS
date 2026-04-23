'use client'

import EditMenu from '@/components/edit-menu'
import LineChart01 from '@/components/charts/line-chart-01'
import { chartAreaGradient } from '@/components/charts/chartjs-config'

// Import utilities
import { adjustColorOpacity, getCssVariable } from '@/components/utils/utils'

export default function DashboardCard02() {

  const chartData = {
    labels: [
      '01-01-2025', '02-01-2025', '03-01-2025',
      '04-01-2025', '05-01-2025', '06-01-2025',
      '07-01-2025', '08-01-2025', '09-01-2025',
      '10-01-2025', '11-01-2025', '12-01-2025',
      '01-01-2026', '02-01-2026',
    ],
    datasets: [
      // Primary line — monthly sleep lessons finished
      {
        data: [
          210, 198, 185, 172, 168, 155,
          149, 142, 151, 158, 163, 170,
          178, 174,
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
      // Gray line — previous period lessons
      {
        data: [
          195, 202, 210, 198, 192, 188,
          180, 175, 168, 172, 178, 185,
          190, 202,
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
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Sleep Wellness</h2>
          {/* Menu button */}
          <EditMenu align="right" />
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Lessons Finished</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">174</div>
          <div className="text-sm font-medium text-red-700 px-1.5 bg-red-500/20 rounded-full">-14%</div>
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
