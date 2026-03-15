<script lang="ts">
  import "./layout.css";
  import { page } from "$app/state";
  import { Settings, Github, ArrowLeft } from "@lucide/svelte/icons";
  import { ModeWatcher } from "mode-watcher";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import DarkModeSwitch from "$lib/components/ui/dark-mode-switch/dark-mode-switch.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <title>Deck Memorizer - Memdeck Trainer for Card Magic</title>
  <meta
    name="description"
    content="Free online memdeck trainer for magicians. Practice and master Mnemonica, Aronson Stack, Redford Stack, Si Stebbins, and Memorandum card stacks."
  />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="canonical" href={page.url.origin + page.url.pathname} />
  <meta property="og:site_name" content="Deck Memorizer" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={page.url.origin + page.url.pathname} />
  <meta property="og:image" content={page.url.origin + '/og-image.png'} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={page.url.origin + '/og-image.png'} />
</svelte:head>

<ModeWatcher />
<div class={["flex flex-col", page.data.boundedLayout ? "h-dvh" : "min-h-dvh"]}>
  <div class={["container mx-auto px-4 py-8 flex-1 flex flex-col", page.data.boundedLayout && "h-full"]}>
    <div class="flex justify-between py-4 mb-8">
      <div>
        {#if page.data.showBackButton !== false}
          <Button variant="outline" onclick={() => history.back()}>
            <ArrowLeft />
            Back
          </Button>
        {/if}
      </div>
      <div class="flex items-center gap-4">
        {#if page.route.id === "/"}
          <Button
            href="https://github.com/pledominykas/deckmemorizer/issues"
            target="_blank"
            variant="outline"
          >
            <Github />
            Feature Requests & Bug Reports
          </Button>
        {/if}
        <Dialog.Root>
          <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
            <Settings />
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Settings</Dialog.Title>
              <Dialog.DialogContent class="flex flex-col gap-4">
                <div class="flex items-center gap-4">
                  Dark mode: <DarkModeSwitch />
                </div>
              </Dialog.DialogContent>
            </Dialog.Header>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>
    {@render children()}
  </div>
</div>
