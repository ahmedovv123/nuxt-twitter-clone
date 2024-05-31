<script setup>
import { HomeIcon } from '@heroicons/vue/solid'
import {HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, DocumentTextIcon, UsersIcon, DotsCircleHorizontalIcon} from '@heroicons/vue/outline'
const { defaultTransition } = useTailwindConfig()

</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="p-2 my-2 hover:bg-blue-50 rounded-full w-min dark:hover:bg-white/20" :class="defaultTransition" >
      <nuxt-link to="/">
        <div class="w-8 h-8">
          <LogoTwitter />
        </div>
      </nuxt-link>
    </div>
    <div class="mt-2 space-y-3">
      <SidebarLeftTab active>
        <template #icon>
          <HomeIcon />
        </template>
        <template #name>
          Home
        </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template #icon>
          <HashtagIcon />
        </template>
        <template #name>
          Explore
        </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template #icon>
          <BellIcon />
        </template>
        <template #name>
          Notifications
        </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template #icon>
          <InboxIcon />
        </template>
        <template #name>
          Messages
        </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template #icon>
          <BookmarkIcon />
        </template>
        <template #name>
          Bookmarks
        </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template #icon>
          <DocumentTextIcon />
        </template>
        <template #name>
          Lists
        </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template #icon>
          <UsersIcon />
        </template>
        <template #name>
          Profile
        </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template #icon>
          <DotsCircleHorizontalIcon />
        </template>
        <template #name>
          More
        </template>
      </SidebarLeftTab>
    </div>
  </div>
</template>