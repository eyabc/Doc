<template>
    <div id="global-layout">
        <component :is="$page.path ? 'Layout' : 'NotFound'"/>
    </div>
</template>
