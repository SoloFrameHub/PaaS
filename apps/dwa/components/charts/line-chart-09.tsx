'use client'

import { useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

import { chartColors } from '@/components/charts/chartjs-config'
import {
  Chart, LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js'
import type { ChartData } from 'chart.js'
import 'chartjs-adapter-date-fns'

// Import utilities
import { formatValue } from '@/components/utils/utils'

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip)

interface LineChart09Props {
  data: ChartData
  width: number
  height: number
}

export default function LineChart09({
  data,
  width,
  height
}: LineChart09Props) {

  const [chart, setChart] = useState<Chart | null>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const darkMode = theme === 'dark'
  const { gridColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors

  useEffect(() => {    
    const ctx = canvas.current
    if (!ctx) return
    
    const newChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          y: {
            display: false,
            beginAtZero: true,
          },
          x: {
            type: 'time',
            time: {
              parser: 'MM-DD-YYYY',
              unit: 'month',
            },
            display: false,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: () => '', // Disable tooltip title
              label: (context) => formatValue(context.parsed.y ?? 0),
            },
            bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
            backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
            borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,             
          },
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        maintainAspectRatio: false,
      },
    })
    setChart(newChart)
    return () => newChart.destroy()
  }, [])

  useEffect(() => {
    if (!chart) return

    try {
      const mode = darkMode ? 'dark' : 'light'
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