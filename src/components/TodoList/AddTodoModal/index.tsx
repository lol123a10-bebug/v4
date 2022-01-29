import { useHookstate } from "@hookstate/core";
import styled from "styled-components";
import useTodo from "../../../hookstate/hooks/useTodo";
import { TodoType } from "../../../hookstate/state/todoHookstate";
import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, FormEvent, FormEventHandler } from "react";
import ModalWrapper from "../../shared/ui/ModalWrapper";
import BaseButton from "../../shared/ui/BaseButton";

type PropsType = {
  onClose: Function;
};

const initTodo = {
  id: uuidv4(),
  name: "",
  description: "",
  isDone: false,
};

const AddTodoModal: React.FC<PropsType> = (props) => {
  const { onClose } = props;
  const { onTodoAdded } = useTodo();

  const todo = useHookstate<TodoType>(initTodo);

  const handleTodoValue = (key: "name" | "description") => {
    return todo[key].value;
  };

  const handleTodoChange =
    (key: "name" | "description") => (e: ChangeEvent<HTMLInputElement>) => {
      todo[key].set(e.target.value);
    };

  const handleClose = () => {
    onClose();
  };

  const handleTodoAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todo.name.value.trim() === "") return alert("Please fill name.");

    onTodoAdded(todo.value);
    handleClose();
  };

  return (
    <ModalWrapper onClose={handleClose}>
      <StyledAddTodo onSubmit={handleTodoAdd}>
        <Label htmlFor="name">Title:</Label>
        <Input
          id="name"
          onChange={handleTodoChange("name")}
          value={handleTodoValue("name")}
        />

        <Label htmlFor="description">Description:</Label>
        <Input
          id="description"
          onChange={handleTodoChange("description")}
          value={handleTodoValue("description")}
        />

        <StyledButton type="submit">OK</StyledButton>
      </StyledAddTodo>
    </ModalWrapper>
  );
};

const Label = styled.label`
  color: #fff;
`;

const StyledButton = styled(BaseButton)`
  grid-column-end: -1;
`;

const Input = styled.input`
  padding: 0.5rem 0.5rem;
`;

const StyledAddTodo = styled.form`
  display: grid;
  grid-template-columns: 0.3fr 0.7fr;
  align-items: center;
  column-gap: 0.5rem;
  row-gap: 1rem;
`;

export default AddTodoModal;
