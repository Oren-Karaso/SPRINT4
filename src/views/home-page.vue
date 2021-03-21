<template>
  <section class="home-page">
    <home-page-header />
    <div class="main-content">
        <div class="logo">
            <img src="@/assets/icons/increase.svg" width="100">
        </div>
        <div>
            <h1>WhatsDone</h1>
            <p>From the initial idea to the end product. Manage you project with your team members
                 by defining tasks, assign different responsibilities and check their statuses.
                 <span>WhatsDone</span> will help you make sure you are in control and on top of everyting!.</p>
            <router-link class="try-btn" to="/board">Try now!</router-link>
        </div>
    </div>
  </section>
</template>

<script>
import homePageHeader from '@/cmps/home-page-header'
export default {
    components: {
        homePageHeader
    }
}
</script>
