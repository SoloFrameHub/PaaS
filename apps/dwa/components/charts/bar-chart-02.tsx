'use client'

import { useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

import { chartColors } from '@/components/charts/chartjs-config'
import {
  Chart, BarController, BarElement, LinearScale, TimeScale, Tooltip, Legend,
} from 'chart.js'
import type { ChartData } from 'chart.js'
import 'chartjs-adapter-date-fns'

// Import utilities
import { formatValue } from '@/components/utils/utils'

Chart.register(BarController, BarElement, LinearScale, TimeScale, Tooltip, Legend)

interface BarChart02Props {
  data: ChartData
  width: number
  height: number
}

export default function BarChart02({
  data,
  width,
  height
}: BarChart02Props) {

  const [chart, setChart] = useState<Chart | null>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const darkMode = theme === 'dark'
  const { textColor, gridColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors 

  useEffect(() => {    
    const ctx = canvas.current
    if (!ctx) return
    
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        layout: {
          padding: {
            top: 12,
            bottom: 16,
            left: 20,
            right: 20,
          },
        },
        scales: {
          y: {
            stacked: true,
            border: {
              display: false,
            },
            beginAtZero: true,
            ticks: {
              maxTicksLimit: 5,
              callback: (value) => formatValue(+value),
              color: darkMode ? textColor.dark : textColor.light,
            },
            grid: {
              color: darkMode ? gridColor.dark : gridColor.light,
            },  
          },
          x: {
            stacked: true,
            type: 'time',
            time: {
              parser: 'MM-DD-YYYY',
              unit: 'month',
              displayFormats: {
                month: 'MMM YY',
              },
            },
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
              color: darkMode ? textColor.dark : textColor.light,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => '', // Disable tooltip title
              label: (context) => formatValue(context.parsed.y ?? 0),
            },
            bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
            backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
            borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,                
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: {
          duration: 200,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    })
    setChart(newChart)
    return () => newChart.destroy()
  }, [])

  useEffect(() => {
    if (!chart) return

    try {
      const mode = darkMode ? 'dark' : 'light'
      const xTicks = chart.options.scales?.x?.ticks; if (xTicks) xTicks.color = textColor[mode]
      const yTicks = chart.options.scales?.y?.ticks; if (yTicks) yTicks.color = textColor[mode]
      const yGrid = chart.options.scales?.y?.grid; if (yGrid) yGrid.color = gridColor[mode]
      const tooltip = chart.options.plugins?.tooltip
      if (tooltip) {
        tooltip.bodyColor = tooltipBodyColor[mode]
        tooltip.backgroundColor = tooltipBgColor[mode]
        tooltip.borderColor = tooltipBorderColor[mode]
      }
      chart.update('none')
    } catch { /* chart may be mid-destroy */ }
  }, [theme])   

  return (
    <canvas ref={canvas} width={width} height={height}></canvas>
  )
}