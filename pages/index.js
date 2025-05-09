import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <div style={{ background: "#2a1b3d", minHeight: "100vh", padding: "20px" }}>
      <TodoList />
    </div>
  );
}
