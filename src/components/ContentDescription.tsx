import "../styles/ContentDescription.css";

export default function ContentDescription(props: {
  header: string;
  content: string;
}) {
  return (
    <>
      <h2 className="component-header">{props.header}</h2>
      <p className="commit-description">{props.content}</p>
    </>
  );
}
