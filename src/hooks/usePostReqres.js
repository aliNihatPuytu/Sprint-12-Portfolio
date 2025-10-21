import { useMutation } from "@tanstack/react-query";
import { postWorkintech } from "../utils/api";

export function usePostReqres() {
  return useMutation({
    mutationFn: (payload) => postWorkintech(payload),
  });
}
