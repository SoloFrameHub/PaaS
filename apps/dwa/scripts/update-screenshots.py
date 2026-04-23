#!/usr/bin/env python3
"""
Replace screenshot placeholders with FeatureScreenshot components
"""

import re

# Feature screenshot data
screenshots = [
    {
        'number': 4,
        'filename': '09-course-catalog.png',
        'alt': 'Two-school architecture showing therapeutic and optimization tracks',
        'gradient_from': 'from-indigo-50',
        'gradient_to': 'to-blue-50',
        'icon_bg': 'bg-indigo-500',
        'icon_path': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
        'fallback_title': '[Two-School Dashboard]',
        'fallback_desc': 'Therapeutic + Optimization tracks',
    },
    {
        'number': 5,
        'filename': '10-analytics.png',
        'alt': 'Patient progress analytics and engagement metrics dashboard',
        'gradient_from': 'from-emerald-50',
        'gradient_to': 'to-teal-50',
        'icon_bg': 'bg-emerald-500',
        'icon_path': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        'fallback_title': '[Analytics Dashboard Screenshot]',
        'fallback_desc': 'Completion rates, quiz scores, engagement trends',
    },
    {
        'number': 6,
        'filename': '06-revenue-dashboard.png',
        'alt': 'Revenue dashboard showing subscription tracking and performance',
        'gradient_from': 'from-amber-50',
        'gradient_to': 'to-yellow-50',
        'icon_bg': 'bg-amber-500',
        'icon_path': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        'fallback_title': '[Revenue Dashboard Screenshot]',
        'fallback_desc': 'Subscription tracking, revenue share reporting',
    },
    {
        'number': 7,
        'filename': '11-security.png',
        'alt': 'HIPAA-compliant security architecture and data protection',
        'gradient_from': 'from-gray-50',
        'gradient_to': 'to-slate-50',
        'icon_bg': 'bg-gray-700',
        'icon_path': 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
        'fallback_title': '[Security Architecture]',
        'fallback_desc': 'HIPAA-compliant infrastructure, encrypted data',
    },
    {
        'number': 8,
        'filename': '08-ai-coach.png',
        'alt': 'AI wellness coach interface with therapeutic guidance',
        'gradient_from': 'from-violet-50',
        'gradient_to': 'to-purple-50',
        'icon_bg': 'bg-violet-500',
        'icon_path': 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
        'fallback_title': '[AI Coach Interface]',
        'fallback_desc': 'Guided support, skill practice, therapeutic reinforcement',
    },
    {
        'number': 9,
        'filename': '12-forum.png',
        'alt': 'Community forum with peer support and moderated discussions',
        'gradient_from': 'from-cyan-50',
        'gradient_to': 'to-blue-50',
        'icon_bg': 'bg-cyan-500',
        'icon_path': 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        'fallback_title': '[Community Forum (Coming Soon)]',
        'fallback_desc': 'Peer support, moderated discussions, engagement',
    },
    {
        'number': 10,
        'filename': '13-customization.png',
        'alt': 'White-label customization dashboard with branding options',
        'gradient_from': 'from-pink-50',
        'gradient_to': 'to-rose-50',
        'icon_bg': 'bg-pink-500',
        'icon_path': 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
        'fallback_title': '[Customization Dashboard]',
        'fallback_desc': 'Branding, logos, colors, domain setup',
    },
]

def generate_component(data):
    return f'''                <FeatureScreenshot
                  imagePath="/images/practices/{data['filename']}"
                  alt="{data['alt']}"
                  gradientFrom="{data['gradient_from']}"
                  gradientTo="{data['gradient_to']}"
                  iconBg="{data['icon_bg']}"
                  fallbackIcon={{
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{1.5}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="{data['icon_path']}" />
                    </svg>
                  }}
                  fallbackTitle="{data['fallback_title']}"
                  fallbackDescription="{data['fallback_desc']}"
                />'''

if __name__ == '__main__':
    print("Screenshot replacement components:\n")
    for screenshot in screenshots:
        print(f"\n# Feature {screenshot['number']}:")
        print(generate_component(screenshot))
        print()
