<script lang="ts" module>
  import * as Card from "$lib/components/ui/card/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import { goto } from "$app/navigation";
  import { Sparkles } from "@lucide/svelte/icons";
  import { PracticeProgressCard } from "$lib/components/ui/practice-progress-card";
  import type { PageData } from "./$types";
</script>

<script>
  let { data }: { data: PageData } = $props();

  let practiceState = $derived(data.practiceState);
</script>

<Card.Root>
  <div class="flex justify-center">
    <Sparkles class="w-32 h-32 text-accent-foreground" />
  </div>
  <Card.Header class="text-center">
    <Card.Title class="text-2xl">Practice makes perfect!</Card.Title>
    <p>Review your results and keep practicing to improve your skills.</p>
  </Card.Header>
  <Card.Content class="flex flex-col items-center">
    <PracticeProgressCard
      title="Correct"
      content={`${practiceState.correctAnswerCount} / ${practiceState.answeredQuestionCount} (${Math.round(
        (practiceState.correctAnswerCount /
          practiceState.answeredQuestionCount) *
          100 || 0,
      )}%)`}
      footer="answered correctly"
    />
  </Card.Content>
  <Card.Footer class="justify-center">
    <Button onclick={() => goto("/")}>Back to Menu</Button>
  </Card.Footer>
</Card.Root>
