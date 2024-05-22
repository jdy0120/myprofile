import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { animateScroll } from "react-scroll";

import useScroll from "../../../../../hooks/useScroll";

import getElementOffset from "../../../../../utils/offset/getElementOffset";

import RevealOnScroll from "../../../../b_mocules/revealonscroll";

const STICK_OFFSET = 100;

interface TocWrapperProps {
  stick: boolean;
}

const TocWrapper = styled.div<TocWrapperProps>`
  position: absolute;
  opacity: 1;
  left: 100%;

  & > div {
    padding-right: 20px;
    padding-left: 16px;
    margin-left: 48px;
    position: relative;
    width: 240px;
    max-height: calc(100% - 185px);
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 3px;
    }
    ::-webkit-scrollbar-track {
      background: ${(props) => props.theme.colors.scrollTrack};
    }

    ::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.colors.scrollHandle};
    }

    ${(props) =>
      props.stick &&
      css`
        position: fixed;
        top: ${STICK_OFFSET}px;
      `}
  }

  @media (max-width: 1300px) {
    display: None;
  }
`;

interface ParagraphTitleProps {
  subtitle: boolean;
  active: boolean;
}

const ParagraphTitle = styled.div<ParagraphTitleProps>`
  margin-bottom: 8px;
  padding-left: ${(props) => (props.subtitle ? 19.2 : 0)}px;
  font-size: 14.4px;
  color: ${(props) => props.theme.colors.mutedText};
  line-height: 1.3;
  transition: all 0.2s;

  ${(props) =>
    props.active &&
    css`
      transform: translate(-11.2px, 0);
      color: ${(props) => props.theme.colors.secondaryText};
    `}

  &:hover {
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
  }
`;

interface TocProps {
  items: any[];
  articleOffset: number;
}

const Toc = ({ items, articleOffset }: TocProps) => {
  const { y } = useScroll();

  const [revealAt, setRevealAt] = useState(4000);
  const [headers, setHeaders] = useState<any>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const bioElm = document.getElementById("bio") as HTMLElement;

    setRevealAt(
      getElementOffset(bioElm).top -
        bioElm?.getBoundingClientRect().height -
        400
    );
  }, []);

  useEffect(() => {
    setHeaders(
      [
        ...document.querySelectorAll(
          "#article-body > h2, #article-body > h3"
        ),
      ].map((element) => getElementOffset(element as HTMLElement).top)
    );
  }, []);

  useEffect(() => {
    headers.forEach((header: any, i: number) => {
      if (header - 300 < y) {
        setActive(i);
        return;
      }
    });
  }, [y]);

  const handleClickTitle = (index: number) => {
    animateScroll.scrollTo(headers[index] - 100);
  };

  return (
    <RevealOnScroll revealAt={revealAt} reverse>
      <TocWrapper stick={y > articleOffset - STICK_OFFSET}>
        <div>
          {items.map((item, i) => (
            <ParagraphTitle
              key={i}
              subtitle={item.tagName === "H3"}
              active={i === active}
              onClick={() => handleClickTitle(i)}
            >
              {item.innerText}
            </ParagraphTitle>
          ))}
        </div>
      </TocWrapper>
    </RevealOnScroll>
  );
};

export default Toc;
