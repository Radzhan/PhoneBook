import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState } from "./contact";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;