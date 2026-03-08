<script lang="ts" module>
  import CardDisplay from "$lib/components/ui/card-display/card-display.svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  import { QuestionType, type Answer } from "$lib/types/questions";
  import type { PageData } from "./$types";
  import { CardSuit, CardValue } from "$lib/types/cards";
  import { AnswerType } from "$lib/types/questions";
  import { Button } from "$lib/components/ui/button";
  import {
    updatePracticeProgress,
    generateNextQuestion,
    loadOrCreatePracticeState,
  } from "$lib/utils/practice";
  import clsx from "clsx";
  import PracticeProgressCard from "$lib/components/ui/practice-progress-card/practice-progress-card.svelte";
  import { goto } from "$app/navigation";
</script>

<script lang="ts">
  let { data }: { data: PageData } = $props();

  let practiceState = $state(
    loadOrCreatePracticeState(data.deck, data.practiceSettings),
  );

  let userSelection = $state<{
    suit: CardSuit | null;
    value: CardValue | null;
    position: number | null;
  }>({
    suit: null,
    value: null,
    position: null,
  });

  let currentQuestion = $derived(practiceState.currentQuestion);
  let correctAnswer = $derived(practiceState.currentQuestion.answer);
  let isAnswerSubmitted = $state(false);

  const onSubmitClick = () => {
    const answer: Answer =
      currentQuestion.answer.kind === AnswerType.Card
        ? {
            kind: AnswerType.Card,
            value: {
              suit: userSelection.suit!,
              value: userSelection.value!,
            },
          }
        : {
            kind: AnswerType.Position,
            value: userSelection.position!,
          };

    isAnswerSubmitted = true;

    updatePracticeProgress(practiceState, answer);
  };

  const onContinueClick = () => {
    userSelection = {
      suit: null,
      value: null,
      position: null,
    };

    isAnswerSubmitted = false;

    if (
      practiceState.answeredQuestionCount >=
      data.practiceSettings.numberOfQuestions
    ) {
      goto(`practice-results`);
      return;
    }

    generateNextQuestion(practiceState, data.deck, data.practiceSettings);
  };
</script>

<div class="flex flex-col flex-1 min-h-0 gap-6">
  <div class="flex justify-between items-center gap-6">
    <PracticeProgressCard
      title="Progress"
      content={`${practiceState.answeredQuestionCount} / ${data.practiceSettings.numberOfQuestions}`}
      footer="answered"
    />
    <PracticeProgressCard
      title="Streak"
      content={`${practiceState.currentStreak}`}
      footer="in a row"
    />
    <PracticeProgressCard
      title="Correct"
      content={`${practiceState.correctAnswerCount} / ${practiceState.answeredQuestionCount} (${Math.round(
        (practiceState.correctAnswerCount /
          practiceState.answeredQuestionCount) *
          100 || 0,
      )}%)`}
      footer="answered correctly"
    />
  </div>
  <Card.Root class="flex flex-col flex-1 min-h-0 gap-6 md:gap-16">
    <Card.Header>
      <Card.Description>
        Practicing: {data.deck.title} by {data.deck.author}
      </Card.Description>
      <Card.Title class="text-2xl">
        {currentQuestion.question}
      </Card.Title>
    </Card.Header>
    <Card.Content class="flex flex-col flex-1 min-h-0">
      <div class="flex justify-center flex-1 min-h-0 gap-4">
        {#if currentQuestion.kind === QuestionType.ReversePositional || currentQuestion.kind === QuestionType.AdjacentBefore || currentQuestion.kind === QuestionType.AdjacentAfter}
          <CardDisplay card={currentQuestion.questionCard} />
        {:else if currentQuestion.kind === QuestionType.Positional}
          <CardDisplay position={currentQuestion.questionPosition} />
        {:else if currentQuestion.kind === QuestionType.CutCalculation}
          <CardDisplay card={currentQuestion.questionCard} />
          <CardDisplay position={currentQuestion.questionPosition} />
        {/if}
      </div>
    </Card.Content>
    <Card.Footer class="flex flex-col gap-8 px-1 sm:px-6">
      {#if currentQuestion.answer.kind === AnswerType.Card}
        <div class="flex flex-col gap-4 items-center">
          <ToggleGroup.Root
            disabled={isAnswerSubmitted}
            type="single"
            value={userSelection.value?.toString()}
            onValueChange={(value) =>
              (userSelection.value = value as CardValue)}
          >
            {#each Object.values(CardValue) as value}
              <ToggleGroup.Item
                {value}
                class={clsx("border", {
                  "bg-(--correct-answer)/50 border-(--correct-answer) data-[state=on]:bg-(--correct-answer)/50 data-[state=on]:border-(--correct-answer)":
                    isAnswerSubmitted &&
                    correctAnswer.kind === AnswerType.Card &&
                    correctAnswer.value?.value === value,
                })}
              >
                {value}
              </ToggleGroup.Item>
            {/each}
          </ToggleGroup.Root>
          <ToggleGroup.Root
            disabled={isAnswerSubmitted}
            type="single"
            value={userSelection.suit?.toString()}
            onValueChange={(value) => (userSelection.suit = value as CardSuit)}
          >
            {#each Object.values(CardSuit) as value}
              <ToggleGroup.Item
                {value}
                class={clsx("border", {
                  "bg-(--correct-answer)/50 border-(--correct-answer) data-[state=on]:bg-(--correct-answer)/50 data-[state=on]:border-(--correct-answer)":
                    isAnswerSubmitted &&
                    correctAnswer.kind === AnswerType.Card &&
                    correctAnswer.value?.suit === value,
                })}
              >
                {#if value === CardSuit.Spades}
                  <span class="text-(--deck-card-black)">&spades; {value}</span>
                {:else if value === CardSuit.Hearts}
                  <span class="text-(--deck-card-red)">&hearts; {value}</span>
                {:else if value === CardSuit.Clubs}
                  <span class="text-(--deck-card-black)">&clubs; {value}</span>
                {:else if value === CardSuit.Diamonds}
                  <span class="text-(--deck-card-red)">&diams; {value}</span>
                {/if}
              </ToggleGroup.Item>
            {/each}
          </ToggleGroup.Root>
        </div>
      {:else if currentQuestion.answer.kind === AnswerType.Position}
        <div class="flex flex-col gap-4 items-center w-full 2xl:w-1/2">
          <ToggleGroup.Root
            disabled={isAnswerSubmitted}
            type="single"
            class="flex flex-wrap justify-center gap-y-1 md:gap-1"
            value={userSelection.position?.toString()}
            onValueChange={(value) =>
              (userSelection.position = parseInt(value) || null)}
          >
            {#each Array(data.deck.cards.length) as _, index}
              <ToggleGroup.Item
                value={(index + 1).toString()}
                class={clsx("border basis-1/8 md:basis-1/14", {
                  "bg-(--correct-answer)/50 border-(--correct-answer) data-[state=on]:bg-(--correct-answer)/50 data-[state=on]:border-(--correct-answer)":
                    isAnswerSubmitted &&
                    correctAnswer.kind === AnswerType.Position &&
                    correctAnswer.value === index + 1,
                })}
              >
                {index + 1}
              </ToggleGroup.Item>
            {/each}
          </ToggleGroup.Root>
        </div>
      {/if}
      <div>
        <Button
          disabled={userSelection.position === null &&
            (userSelection.suit === null || userSelection.value === null)}
          onclick={isAnswerSubmitted ? onContinueClick : onSubmitClick}
          >{isAnswerSubmitted ? "Next" : "Submit"}</Button
        >
      </div>
    </Card.Footer>
  </Card.Root>
</div>
