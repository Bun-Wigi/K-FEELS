import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Home from "../src/pages/Home";
import AnimatedCard from "../src/components/AnimatedCard";

const fnMock = vi.fn()
 const fnMock2 = vi.fn()
// onselect.mood()
// fnMockSpy.mock.calls.length
  const testProps = {
        step : 2,
        title:"string title",
        options: fnMock,
        onSelect: fnMock2,

    };
    
describe ('Home.tsx', () => {
  

    it('Renders home?', () => {
        render (<Home  {...AnimatedCard}/>)
    })
    // it('render animate card', () => {
    //     <AnimatedCard />
    // })
});