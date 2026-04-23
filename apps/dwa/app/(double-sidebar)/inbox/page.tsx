export const metadata = {
  title: 'Inbox - Wellness Academy',
  description: 'Page description',
}

import { FlyoutProvider } from '@/app/flyout-context'
import InboxSidebar from './inbox-sidebar'
import InboxBody from './inbox-body'
import mailUser01 from '@/public/images/user-40-11.jpg'
import mailUser02 from '@/public/images/user-avatar-80.png'

function InboxContent() {

  // Some dummy mail data
  const mails = [
    {
      id: 0,
      open: false,
      image: mailUser01,
      name: 'Dominik Lamakani',
      email: 'dominik@wellnessacademy.com',
      date: 'Sep 3, 3:18 PM',
      recipients: ['me', 'Carolyn'],
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore…',
      message: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p>Consectetur adipiscing elit, sed do eiusmod aliqua? Check below:</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p><p>Cheers,</p><p class="font-medium">Dominik Lamakani</p>',
    },
    {
      id: 1,
      open: false,
      image: mailUser02,
      name: 'Wellness Academy',
      email: 'support@wellnessacademy.com',
      date: 'Sep 3, 3:18 PM',
      recipients: ['me', 'Dominik'],
      excerpt: 'Dominik, welcome to your wellness journey! We wanted to share some tips to get you started…',
      message: '<p>Dominik, welcome to your wellness journey! We wanted to share some tips to help you get the most from your courses.</p><p>Here are a few ways to stay on track:</p><p>Set a daily intention, complete one lesson per day, and use the mood journal to reflect on your progress. Remember, small consistent steps lead to lasting change.</p><p>Warmly,</p><p class="font-medium">Wellness Academy Team</p>',
    },
    {
      id: 2,
      open: true,
      image: mailUser01,
      name: 'Dominik Lamakani',
      email: 'dominik@wellnessacademy.com',
      date: 'Sep 4, 3:37 AM',
      recipients: ['me', 'Carolyn'],
      excerpt: 'Hey team 👋 I just finished the Sleep Mastery module and wanted to share some thoughts…',
      message: `<p>Hey team 👋</p><p>I just finished the Sleep Mastery module and wanted to share some thoughts. The <span class="underline">guided relaxation exercises</span> were really helpful, especially the breathing technique in Lesson 3.</p><p>Has anyone tried the <a class="font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" href="#0">evening wind-down routine</a> from the course? I'd love to hear how it worked for you.</p><p><img src="./images/inbox-image.jpg" width="320" height="190" alt="Inbox image" /></p><p>Looking forward to starting the Stress Management course next. Any tips from those who've already completed it?</p><p>Best,</p><p class="font-medium">Dominik Lamakani</p>`,
    },
  ]

  return (
    <div className="relative flex h-full">
      <InboxSidebar />
      <InboxBody mails={mails} />
    </div>
  )
}

export default function Inbox() {
  return (
    <FlyoutProvider>
      <InboxContent />
    </FlyoutProvider>
  )
}