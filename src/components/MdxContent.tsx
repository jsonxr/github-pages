import Image from 'next/image';
import * as runtime from 'react/jsx-runtime';
import { Callout } from './Callout';

const useMdxComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
};

type MdxProps = {
  code: string;
};

export function MdxContent({ code }: MdxProps) {
  const Component = useMdxComponent(code);
  return <Component components={components} />;
}
