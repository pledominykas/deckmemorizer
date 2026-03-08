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
  <title>Deck Memorizer</title>
  <meta
    name="description"
    content="A trainer for memdeck memorization to help magicians learn and recall card stacks."
  />
</svelte:head>

<ModeWatcher />
<div class="h-screen">
  <div class="container mx-auto px-4 py-8 h-full flex flex-col overflow-y-auto">
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
