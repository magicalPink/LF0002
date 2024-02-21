<template>
  <css-doodle>
    :doodle {
    flex: none;
    @grid: 15x15
    / 100vw 100vh /;
    overflow: hidden;
    }

    :container {
    padding: 3vmin 2vmin 0;
    color: #red;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(16, 1fr);
    --gap: 75ms;
    }

    --colors: (#cdb4db, #ffc8dd, #ffafcc, #bde0fe, #a2d2ff);
    --color: @p(--colors);
    --color-1: @P;
    --color-2: @P;

    grid-column: span 2;

    @nth(15n - 6) {
    grid-column: 2 / span 2;
    }

    @nth(7n + 98) { --delay: calc(var(--gap) * 1); }
    @nth(7n + 83) { --delay: calc(var(--gap) * 2); }
    @nth(7n + 68) { --delay: calc(var(--gap) * 3); }
    @nth(7n + 53) { --delay: calc(var(--gap) * 4); }
    @nth(7n + 38) { --delay: calc(var(--gap) * 5); }
    @nth(7n + 23) { --delay: calc(var(--gap) * 6); }
    @nth(7n + 8) { --delay: calc(var(--gap) * 7); }
    @nth(91 - 7n) { --delay: calc(var(--gap) * 8); }
    @nth(76 - 7n) { --delay: calc(var(--gap) * 9); }
    @nth(61 - 7n) { --delay: calc(var(--gap) * 10); }
    @nth(46 - 7n) { --delay: calc(var(--gap) * 11); }
    @nth(31 - 7n) { --delay: calc(var(--gap) * 12); }
    @nth(16 - 7n) { --delay: calc(var(--gap) * 13); }
    @nth(1) { --delay: calc(var(--gap) * 14); }
    @nth(113) { --delay: 0ms }


    ::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    @size: 2vmin;
    border-radius: 100%;
    background: var(--color);
    animation: before cubic-bezier(.65,.48,.16,1.27) 8000ms var(--delay) both infinite;
    }

    ::after {
    content: "@p(🌸,🌼)";
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 3.75vmin;
    color: transparent;
    background-image: radial-gradient(var(--color-1) 20%, var(--color) calc(20% + 0.5px));
    -webkit-background-clip: text;
    animation: after ease 8000ms var(--delay) both infinite;
    }

    @keyframes before {
    0% {
    transform: translate3d(-50%, calc(-50% - 4vmin), 0) scale(0);
    }
    10%, 20% {
    transform: translate3d(-50%, -50%, 0) scale(1);
    }
    30%, 100% {
    transform: translate3d(-50%, calc(-50% - 4vmin), 0) scale(0);
    }
    }

    @keyframes after {
    0%, 25% {
    opacity: 1;
    transform: translate3d(-50%, calc(-50% - 4vmin), 0) scale(0) rotate(-180deg);
    }
    30%, 50% {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0) scale(1) rotate(0);
    }
    100% {
    opacity: @r(0, 0.5);
    transform: translate3d(calc(-50% + @r(-50, 0)vmin), -@r(80, 100)vmin, 0) scale(0) rotate(@r(-360, 360)deg);
    }
    }
  </css-doodle  >
</template>

<script setup>
import "css-doodle";
</script>
