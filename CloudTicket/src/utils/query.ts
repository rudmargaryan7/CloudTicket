import { LoadingContext } from "@/App";
import axios, { AxiosError } from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

type returnType = {
  onSumbit: () => void;
};

type ValidatorType = {
  location: string;
  msg: string;
  path: string;
  type: string;
};

type ValidatorHandlerType = {
  error: {
    type: string;
    errors?: ValidatorType[];
    text?: string;
  };
};

const ErrorHandler = (data: ValidatorHandlerType) => {
  if (data.error.type === "validator") {
    const errors = data.error.errors;
    errors?.forEach((e: ValidatorType) => {
      toast.error(`${e.msg} ${e.path} ${e.type}`);
    });
    return;
  }
  if (data.error.text === "Invalid token") {
    localStorage.removeItem("token");
  }
  toast.error(data.error.text);
};

function useQuery(
  query: any,
  body?: object,
  onSuccess?: (data: any) => void
): returnType {
  const changeLoading = useContext(LoadingContext);
  const onSumbit = async () => {
    try {
      changeLoading(true);
      const { data } = await query(body);
      if (data.text) {
        toast.success(data.text);
      }
      if (onSuccess) {
        onSuccess(data);
      }
      changeLoading(false);
    } catch (error) {
      changeLoading(false);
      if (axios.isAxiosError(error)) {
        ErrorHandler(error.response?.data);
        return;
      }
    }
  };
  return { onSumbit };
}

export default useQuery;
