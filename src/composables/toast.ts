import { useToast } from "primevue/usetoast";

const toast = useToast();

export const toastCreator = (
  severity = "success",
  summary = "Success",
  detail = "Message Content",
  life = 3000
) => {
  return toast.add({
    severity: severity,
    summary: summary,
    detail: detail,
    life: life,
  });
};
