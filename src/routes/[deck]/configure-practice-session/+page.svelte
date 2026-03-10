<script lang="ts" module>
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Label } from "$lib/components/ui/label";
  import { QUESTION_TYPE_DATA } from "$lib/constants/questions";
  import type { PageData } from "../$types";
  import { goto } from "$app/navigation";
  import { QuestionType } from "$lib/types/questions";
  import type { PracticeSettings } from "$lib/types/practice";
</script>

<script lang="ts">
  let { data }: { data: PageData } = $props();

  let practiceSettings: PracticeSettings = $state({
    selectedQuestionTypes: Object.values(QuestionType).filter(
      (questionType) => QUESTION_TYPE_DATA[questionType].checkedByDefault,
    ),
    numberOfQuestions: 10,
  });
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Configure Practice Session</Card.Title>
    <Card.Description>{data.deck.title} by {data.deck.author}</Card.Description>
  </Card.Header>
  <Card.Content class="flex flex-col gap-6">
    <p>
      Select the types of questions you want to practice. You can choose
      multiple types.
    </p>
    <div class="py-4 gap-4 flex flex-col">
      {#each Object.values(QUESTION_TYPE_DATA) as questionTypeData}
        <Label
          class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border border-border p-3 transition-colors has-aria-checked:border-muted-foreground has-aria-checked:bg-muted-foreground/10"
        >
          <Checkbox
            id={questionTypeData.kind}
            checked={practiceSettings.selectedQuestionTypes.includes(
              questionTypeData.kind,
            )}
            onCheckedChange={(isChecked) => {
              if (isChecked) {
                practiceSettings.selectedQuestionTypes = [
                  ...practiceSettings.selectedQuestionTypes,
                  questionTypeData.kind,
                ];
              } else {
                practiceSettings.selectedQuestionTypes =
                  practiceSettings.selectedQuestionTypes.filter(
                    (type) => type !== questionTypeData.kind,
                  );
              }
            }}
            class="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />

          <div class="grid gap-1.5 font-normal">
            <p class="text-sm leading-none font-medium">
              {questionTypeData.name}
            </p>
            <p class="text-muted-foreground text-sm">
              {questionTypeData.description}
            </p>
          </div>
        </Label>
      {/each}
    </div>
    <div class="flex items-center gap-4">
      <span>Question count:</span>
      <ToggleGroup.Root
        type="single"
        value={practiceSettings.numberOfQuestions.toString()}
        onValueChange={(value) =>
          (practiceSettings.numberOfQuestions = parseInt(value))}
      >
        {#each [10, 20, 30, 40, 50] as questionCount}
          <ToggleGroup.Item class="border" value={questionCount.toString()}>
            {questionCount}
          </ToggleGroup.Item>
        {/each}
      </ToggleGroup.Root>
    </div>
    <div>
      <Button
        disabled={practiceSettings.selectedQuestionTypes.length === 0}
        onclick={() => {
          const params = new URLSearchParams({
            types: practiceSettings.selectedQuestionTypes.join(","),
            count: practiceSettings.numberOfQuestions.toString(),
          });

          goto(`/${data.deck.id}/practice?${params}`);
        }}
      >
        Start Practice
      </Button>
    </div>
  </Card.Content>
</Card.Root>
