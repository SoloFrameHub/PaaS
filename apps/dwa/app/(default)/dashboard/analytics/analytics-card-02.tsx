'use client'

import Link from 'next/link'
import LineChart04 from '@/components/charts/line-chart-04'
import { chartAreaGradient } from '@/components/charts/chartjs-config'

// Import utilities
import { adjustColorOpacity, getCssVariable } from '@/components/utils/utils'

export default function AnalyticsCard02() {

  const chartData = {
    labels: [
      '01-01-2025', '02-01-2025', '03-01-2025',
      '04-01-2025', '05-01-2025', '06-01-2025',
      '07-01-2025', '08-01-2025', '09-01-2025',
      '10-01-2025', '11-01-2025', '12-01-2025',
      '01-01-2026', '02-01-2026',
    ],
    datasets: [
      // Primary line — active learners right now (trailing trend)
      {
        data: [
          45, 52, 48, 61, 58, 72,
          68, 75, 82, 78, 88, 91,
          85, 94,
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
    ],
  }

  return(
    <div className="flex flex-col col-span-full xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Active Learners Right Now</h2>
      </header>
      {/* Card content */}
      <div className="flex flex-col h-full">
        {/* Live visitors number */}
        <div className="px-5 py-3">
          <div className="flex items-center">
            {/* Red dot */}
            <div className="relative flex items-center justify-center w-3 h-3 mr-3" aria-hidden="true">
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-50"></div>
              <div className="relative inline-flex rounded-full w-1.5 h-1.5 bg-red-500"></div>
            </div>            
            {/* Active learner count */}
            <div>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">94</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Active learners</div>
            </div>
          </div>
        </div>

        {/* Chart built with Chart.js 3 */}
        <div >
          {/* Change the height attribute to adjust the chart height */}
          <LineChart04 data={chartData} width={389} height={70} />
        </div>

        {/* Table */}
        <div className="grow px-5 pt-3 pb-1">
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-gray-300">
              {/* Table header */}
              <thead className="text-xs uppercase text-gray-400 dark:text-gray-500">
                <tr>
                  <th className="py-2">
                    <div className="font-semibold text-left">Top courses</div>
                  </th>
                  <th className="py-2">
                    <div className="font-semibold text-right">Active now</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">Sleep Mastery</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-gray-800">34</div>
                  </td>
                </tr>
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">Stress & Anxiety Relief</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-gray-800">28</div>
                  </td>
                </tr>
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">Mindfulness Foundations</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-gray-800">19</div>
                  </td>
                </tr>
                {/* Row */}
                <tr>
                  <td className="py-2">
                    <div className="text-left">Emotional Resilience</div>
                  </td>
                  <td className="py-2">
                    <div className="font-medium text-right text-gray-800">13</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Card footer */}
        <div className="text-right px-5 pb-4">
          <Link className="text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" href="#0">Full Activity Report -&gt;</Link>
        </div>
      </div>
    </div>
  )
}
