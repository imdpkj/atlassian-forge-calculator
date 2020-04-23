import ForgeUI, {
  Fragment,
  Text,
  Lozenge,
  Button,
  useState,
  Table,
  Head,
  Cell,
  Row,
} from "@forge/ui";
import { OperationsTableProps } from "./types";
import { OperatorSymbolMap } from "./symbols";

export const OperationsTable = (props: OperationsTableProps) => {
  const { operations, addAsComment } = props;
  const [visible, isVisible] = useState(true);

  const toggle = (visible) => isVisible(visible);

  return (
    <Fragment>
      {visible ? (
        <Fragment>
          <Text>**Operations Log**</Text>
          <Button text="Hide Operations Log" onClick={() => toggle(false)} />
          <Table>
            <Head>
              <Cell>
                <Text>Left</Text>
              </Cell>
              <Cell>
                <Text>Operation</Text>
              </Cell>
              <Cell>
                <Text>Right</Text>
              </Cell>
              <Cell>
                <Text>Result</Text>
              </Cell>
              <Cell>
                <Text>Operation</Text>
              </Cell>
            </Head>
            {operations.map((operation) => (
              <Row>
                <Cell>
                  <Text>{operation.operand}</Text>
                </Cell>
                <Cell>
                  <Text>
                    <Lozenge
                      appearance="default"
                      text={OperatorSymbolMap[operation.operator]}
                    />
                  </Text>
                </Cell>
                <Cell>
                  <Text>{operation.operandi}</Text>
                </Cell>
                <Cell>
                  <Text>{operation.result}</Text>
                </Cell>
                <Cell>
                  <Button
                    text="Create Comment"
                    onClick={() => addAsComment(operation)}
                  />
                </Cell>
              </Row>
            ))}
          </Table>
        </Fragment>
      ) : (
        <Button text="Show Operations Log" onClick={() => toggle(true)} />
      )}
    </Fragment>
  );
};
