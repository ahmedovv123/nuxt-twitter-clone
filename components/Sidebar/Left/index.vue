<script setup>
import {HomeIcon} from '@heroicons/vue/solid'
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UsersIcon,
  DotsCircleHorizontalIcon,
  PencilIcon,
  ChevronDownIcon
} from '@heroicons/vue/outline'

const {defaultTransition} = useTailwindConfig()

const emits = defineEmits(['onTweet', 'onLogout'])
const {useAuthUser} = useAuth()
const user = useAuthUser()
</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="p-2 my-2 hover:bg-blue-50 rounded-full w-min dark:hover:bg-white/20" :class="defaultTransition" >
      <nuxt-link to="/">
        <div class="w-8 h-8">
          <LogoTwitter/>
        </div>
      </nuxt-link>
    </div>
    <div class="mt-2 space-y-3">
      <SidebarLeftTab active>
        <template #icon>
          <HomeIcon/>
        </template>
        <template #name>
          Home
        </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template #icon>
          <HashtagIcon/>
        </template>
        <template #name>
          Explore
        </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template #icon>
          <BellIcon/>
        </template>
        <template #name>
          Notifications
        </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template #icon>
          <InboxIcon/>
        </template>
        <template #name>
          Messages
        </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template #icon>
          <BookmarkIcon/>
        </template>
        <template #name>
          Bookmarks
        </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template #icon>
          <DocumentTextIcon/>
        </template>
        <template #name>
          Lists
        </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template #icon>
          <UsersIcon/>
        </template>
        <template #name>
          Profile
        </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template #icon>
          <DotsCircleHorizontalIcon/>
        </template>
        <template #name>
          More
        </template>
      </SidebarLeftTab>

      <div class="hidden xl:block">
        <UIButton liquid size="lg" @click="emits('onTweet')">
          <strong>
            Tweet
          </strong>
        </UIButton>
      </div>

      <div class="block xl:hidden">
        <UIButton @click="emits('onTweet')">
          <div class="w-6 h-6 font-bold">
            <PencilIcon/>
          </div>
        </UIButton>
      </div>
    </div>

    <div
        class="flex items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800"
        :class="defaultTransition"
        @click="emits('onLogout')"
    >
      <div class="flex items-center">
        <img :src="user.profileImage" alt="" class="w-10 h-10 rounded-full">
        <div class="flex-col hidden m-2 xl:block">
          <h1 class="text-sm font-bold text-gray-800 dark:text-white">
            {{ user.name }}
          </h1>
          <p class="text-sm text-gray-400">
            {{ user.handle }}
          </p>
        </div>
      </div>
      <div class="hidden ml-auto xl:block">
        <div class="w-6 h-6 text-gray-800 dark:text-white">
          <ChevronDownIcon/>
        </div>
      </div>


    </div>
  </div>
</template>