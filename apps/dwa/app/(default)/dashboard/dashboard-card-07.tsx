export default function DashboardCard07() {
  return(
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Top Wellness Courses</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Course</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Enrolled</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Completed</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Avg. Score</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Completion Rate</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="w-9 h-9 shrink-0 mr-2 sm:mr-3 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">Sleep Mastery</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">2,412</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">1,877</div>
                </td>
                <td className="p-2">
                  <div className="text-center">87%</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">77.8%</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="w-9 h-9 shrink-0 mr-2 sm:mr-3 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">Stress &amp; Anxiety Relief</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">2,248</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">1,690</div>
                </td>
                <td className="p-2">
                  <div className="text-center">84%</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">75.2%</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="w-9 h-9 shrink-0 mr-2 sm:mr-3 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">Mindfulness Foundations</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">2,034</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">1,524</div>
                </td>
                <td className="p-2">
                  <div className="text-center">82%</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">74.9%</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="w-9 h-9 shrink-0 mr-2 sm:mr-3 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">Emotional Resilience</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">1,910</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">1,396</div>
                </td>
                <td className="p-2">
                  <div className="text-center">80%</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">73.1%</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="w-9 h-9 shrink-0 mr-2 sm:mr-3 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div className="text-gray-800 dark:text-gray-100">Social Connection</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">1,748</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">1,234</div>
                </td>
                <td className="p-2">
                  <div className="text-center">78%</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">70.6%</div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}
