import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Check, Loader2, Pen } from "lucide-react";
import React, { RefObject, useEffect, useRef, useState } from "react";

export default function EditFrom<T>({
  children,
  data: initialData,
  isUpdating,
  title,
}: {
  children: ({
    handleChange,
  }: {
    handleChange: (value: T) => void;
    isReadOnly: boolean;
    data: T;
    formRef: RefObject<HTMLFormElement | null>;
  }) => React.ReactNode;
  data: T;
  isUpdating?: boolean;
  title: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [data, setData] = useState<T>(initialData);

  const handleChange = (value: T) => {
    setData(value);
  };

  useEffect(() => {
    if (!isUpdating) {
      setIsReadOnly(true);
    }
  }, [isUpdating]);

  return (
    <Card>
      <CardTitle className="justify-between flex items-center px-6 pt-6">
        <span>{title}</span>
        {isReadOnly ? (
          <Button
            onClick={() => {
              setIsReadOnly(false);
            }}
            type="button"
            size={"sm"}
            className="space-x-1"
            variant={"outline"}
          >
            <Pen className="size-4" />
            <span>Edit</span>
          </Button>
        ) : (
          <Button
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
            type="button"
            size={"sm"}
            className="space-x-1"
            variant={"outline"}
            disabled={isUpdating}
          >
            {isUpdating && <Loader2 className="size-4 animate-spin" />}
            <Check className="size-4" />
            <span>Save</span>
          </Button>
        )}
      </CardTitle>
      <CardContent>
        {children({ handleChange, isReadOnly, data, formRef })}
      </CardContent>
    </Card>
  );
}
