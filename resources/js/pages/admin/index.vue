<template>
    <header class="page-header">
        <h1 class="page-header__title">Идём<span>в</span>кино</h1>
        <span class="page-header__subtitle">Администраторррская</span>
    </header>

    <main class="conf-steps">

        <HallsBase></HallsBase>
        <HallsPlaces></HallsPlaces>
        <HallsPrice></HallsPrice>
        <HallsMovies></HallsMovies>
        <HallsSale></HallsSale>


    </main>
</template>

<script>
import HallsBase from '@/components/admin/HallsBase.vue';
import HallsPlaces from '@/components/admin/HallsPlaces.vue';
import HallsPrice from '@/components/admin/HallsPrice.vue';
import HallsMovies from '@/components/admin/HallsMovies.vue';
import HallsSale from '@/components/admin/HallsSale.vue';

export default {
    components: {
        HallsBase,
        HallsPlaces,
        HallsPrice,
        HallsMovies,
        HallsSale
    }
}
</script>

<style>

</style>
