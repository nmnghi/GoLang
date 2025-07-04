"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Crown, Star, Rewind } from "lucide-react";
import Link from "next/link";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
  skip: boolean;
};

export const LessonButton = ({
  id,
  index,
  percentage,
  totalCount,
  current,
  locked,
  skip,
}: Props) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;
  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40;
  const isFirst = !skip && index === 0;
  const isLast = !skip && index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = skip
    ? Rewind
    : isCompleted
    ? Check
    : isLast
    ? Crown
    : Star;

  const href = `/lesson/${id}`;
  const disabled = !skip && locked; // bài skip luôn được mở

  const renderProgressButton = (label: string) => (
    <div className="relative h-[102px] w-[102px]">
      <div className={cn("absolute -top-6 left-1/2 -translate-x-1/2 z-10 animate-bounce rounded-xl border-2 bg-white px-3 py-2.5 font-bold uppercase tracking-wide", skip ? "text-indigo-500" : "text-green-500")}>
        {label}
        <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-x-8 border-t-8 border-x-transparent" />
      </div>
      <CircularProgressbarWithChildren
        value={Number.isNaN(percentage) ? 0 : percentage}
        styles={{
          path: {
            stroke: "#4ade80",
          },
          trail: {
            stroke: "#e5e7eb",
          },
        }}
      >
        <Button
          size="rounded"
          variant={skip ? "super" : locked ? "locked" : "secondary"}
          className="h-[70px] w-[70px] border-b-8"
        >
          <Icon
            className={cn(
              "size-10",
              locked
                ? "fill-neutral-400 stroke-neutral-400 text-neutral-400"
                : "fill-primary-foreground text-primary-foreground",
              isCompleted && "fill-white"
            )}
          />
        </Button>
      </CircularProgressbarWithChildren>
    </div>
  );

  return (
    <Link
      href={href}
      aria-disabled={disabled}
      style={{ pointerEvents: disabled ? "none" : "auto" }}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: (current || skip) ? 60 : 24,
        }}
      >
        {skip ? (
          renderProgressButton("Skip")
        ) : current ? (
          renderProgressButton("Start")
        ) : (
          <Button
            size="rounded"
            variant={locked ? "locked" : "secondary"}
            className="h-[70px] w-[70px] border-b-8"
          >
            <Icon
              className={cn(
                "size-10",
                locked
                  ? "fill-neutral-400 stroke-neutral-400 text-neutral-400"
                  : "fill-primary-foreground text-primary-foreground",
                isCompleted && "fill-none stroke-[4]"
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  );
};
