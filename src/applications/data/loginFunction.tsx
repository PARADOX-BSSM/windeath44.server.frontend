import { getTaskCreators } from "@/services/windowManager/tasks.tsx";
import { isLogInedAtom } from "@/atoms/windowManager.ts";
import { useProcessManager } from "@/hooks/processManager.tsx";
import { useAtom } from 'jotai';

export const useLoginFunction = () => {
    const [isLogIned, setIsLogIned] = useAtom(isLogInedAtom);
    const [taskList, addTask, removeTask] = useProcessManager();

    const { logIn, signUp, emailChack, auth } = getTaskCreators(setIsLogIned, addTask, removeTask);

    const changeToSignUp = () => {
        addTask(signUp);
        removeTask(logIn);
    };

    const changeToEmailCheck = () => {
        addTask(emailChack);
        removeTask(logIn);
        removeTask(auth);
    };

    return { setIsLogIned, changeToSignUp, changeToEmailCheck };
}