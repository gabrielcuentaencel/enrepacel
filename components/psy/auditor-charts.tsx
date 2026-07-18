"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
  ResponsiveContainer,
} from "recharts"

import {
  AI_WINNERS,
  D_STUDY,
  PREFERENCE_SPLIT,
  RATER_FIT,
  VARIANCE_COMPONENTS,
  VARIANCE_KEYS,
  WRIGHT_FACETS,
  WRIGHT_MAP,
} from "@/lib/mock-data"

const AXIS = {
  fontSize: 12,
  fill: "var(--color-muted-foreground)",
}

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid var(--color-border)",
  background: "var(--color-popover)",
  color: "var(--color-popover-foreground)",
  fontSize: 12,
  boxShadow: "0 4px 16px rgb(0 0 0 / 0.08)",
}

// ---------------------------------------------------------------------------
// Variance components — horizontal stacked bar (single 100% bar)
// ---------------------------------------------------------------------------
export function VarianceChart() {
  return (
    <ResponsiveContainer width="100%" height={140}>
      <BarChart
        layout="vertical"
        data={VARIANCE_COMPONENTS}
        margin={{ top: 0, right: 8, bottom: 0, left: 8 }}
        stackOffset="expand"
      >
        <XAxis type="number" hide domain={[0, 1]} />
        <YAxis type="category" dataKey="facet" hide />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v: any, name: any) => [`${v}%`, name]}
          cursor={{ fill: "transparent" }}
        />
        {VARIANCE_KEYS.map((k, i) => (
          <Bar
            key={k.key}
            dataKey={k.key}
            stackId="v"
            fill={k.color}
            isAnimationActive={false}
            radius={
              i === 0
                ? [8, 0, 0, 8]
                : i === VARIANCE_KEYS.length - 1
                  ? [0, 8, 8, 0]
                  : 0
            }
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

// ---------------------------------------------------------------------------
// D-Study projection — line chart
// ---------------------------------------------------------------------------
export function DStudyChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={D_STUDY} margin={{ top: 8, right: 16, bottom: 8, left: -8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis
          dataKey="raters"
          tick={AXIS}
          tickLine={false}
          axisLine={false}
          label={{
            value: "Number of raters",
            position: "insideBottom",
            offset: -2,
            fontSize: 11,
            fill: "var(--color-muted-foreground)",
          }}
        />
        <YAxis
          domain={[0.5, 1]}
          tick={AXIS}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <ReferenceLine
          y={0.8}
          stroke="var(--color-success)"
          strokeDasharray="4 4"
          label={{ value: "0.80 target", fontSize: 10, fill: "var(--color-success)", position: "insideTopRight" }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey="gCoef"
          name="G-coefficient (Eρ²)"
          stroke="var(--color-chart-1)"
          strokeWidth={2.5}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="phi"
          name="Phi (Φ)"
          stroke="var(--color-chart-2)"
          strokeWidth={2.5}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

// ---------------------------------------------------------------------------
// Wright map — scatter, y = logits, x = facet category (with jitter)
// ---------------------------------------------------------------------------
const GROUP_COLORS: Record<string, string> = {
  student: "var(--color-chart-5)",
  human: "var(--color-chart-4)",
  ai: "var(--color-chart-2)",
  item: "var(--color-chart-3)",
}

const GROUP_LABELS: Record<string, string> = {
  student: "Students",
  human: "Human judges",
  ai: "AI judges",
  item: "Items",
}

function jitter(seed: number) {
  return ((Math.sin(seed * 99.7) + 1) / 2 - 0.5) * 0.36
}

const wrightPoints = WRIGHT_MAP.map((p, i) => ({
  ...p,
  x: p.facet + jitter(p.logit + i + p.facet),
  color: GROUP_COLORS[p.group],
}))

export function WrightMapChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={360}>
        <ScatterChart margin={{ top: 10, right: 16, bottom: 24, left: -8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            type="number"
            dataKey="x"
            domain={[0.5, 3.5]}
            ticks={[1, 2, 3]}
            tickFormatter={(v: number) => WRIGHT_FACETS[v] ?? ""}
            tick={AXIS}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="number"
            dataKey="logit"
            domain={[-3, 3]}
            ticks={[-3, -2, -1, 0, 1, 2, 3]}
            tick={AXIS}
            tickLine={false}
            axisLine={false}
            label={{
              value: "Logits",
              angle: -90,
              position: "insideLeft",
              fontSize: 11,
              fill: "var(--color-muted-foreground)",
            }}
          />
          <ZAxis range={[130, 130]} />
          <ReferenceLine
            y={0}
            stroke="var(--color-muted-foreground)"
            strokeDasharray="5 4"
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(v: any, _n: any, p: any) => [
              `${(p?.payload?.logit ?? v).toFixed(2)} logits`,
              p?.payload?.label,
            ]}
          />
          <Scatter data={wrightPoints} isAnimationActive={false}>
            {wrightPoints.map((p, i) => (
              <Cell key={i} fill={p.color} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {["student", "human", "ai", "item"].map((g) => (
          <div key={g} className="flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full"
              style={{ background: GROUP_COLORS[g] }}
            />
            <span className="text-xs text-muted-foreground">
              {GROUP_LABELS[g]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Rater fit statistics — bar chart with reference lines at 0.6 & 1.4
// ---------------------------------------------------------------------------
export function RaterFitChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={RATER_FIT}
        margin={{ top: 8, right: 16, bottom: 8, left: -8 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis
          dataKey="rater"
          tick={{ ...AXIS, fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          interval={0}
          angle={-15}
          textAnchor="end"
          height={50}
        />
        <YAxis
          domain={[0, 1.8]}
          tick={AXIS}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ fill: "var(--color-muted)", opacity: 0.4 }}
          formatter={(v: any) => [Number(v).toFixed(2), "Infit MnSq"]}
        />
        <ReferenceLine
          y={0.6}
          stroke="var(--color-chart-3)"
          strokeDasharray="5 4"
          label={{ value: "0.6", fontSize: 10, fill: "var(--color-chart-3)", position: "left" }}
        />
        <ReferenceLine
          y={1.4}
          stroke="var(--color-destructive)"
          strokeDasharray="5 4"
          label={{ value: "1.4", fontSize: 10, fill: "var(--color-destructive)", position: "left" }}
        />
        <Bar dataKey="infit" radius={[6, 6, 0, 0]} maxBarSize={44} isAnimationActive={false}>
          {RATER_FIT.map((r) => (
            <Cell
              key={r.rater}
              fill={
                r.infit < 0.6 || r.infit > 1.4
                  ? "var(--color-destructive)"
                  : r.type === "ai"
                    ? "var(--color-chart-2)"
                    : "var(--color-chart-1)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// ---------------------------------------------------------------------------
// Feedback preference — pie (Human vs AI)
// ---------------------------------------------------------------------------
export function PreferencePie() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={PREFERENCE_SPLIT}
          dataKey="value"
          nameKey="name"
          innerRadius={62}
          outerRadius={98}
          paddingAngle={3}
          strokeWidth={0}
          isAnimationActive={false}
        >
          {PREFERENCE_SPLIT.map((d) => (
            <Cell key={d.name} fill={d.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v: any, n: any) => [`${v}%`, n]}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

// ---------------------------------------------------------------------------
// Which AI won — bar chart
// ---------------------------------------------------------------------------
export function AiWinnersChart() {
  const colors = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)"]
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={AI_WINNERS}
        margin={{ top: 8, right: 16, bottom: 8, left: -8 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis
          dataKey="model"
          tick={AXIS}
          tickLine={false}
          axisLine={false}
        />
        <YAxis tick={AXIS} tickLine={false} axisLine={false} unit="%" />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ fill: "var(--color-muted)", opacity: 0.4 }}
          formatter={(v: any) => [`${v}%`, "Preference share"]}
        />
        <Bar dataKey="wins" radius={[6, 6, 0, 0]} maxBarSize={64} isAnimationActive={false}>
          {AI_WINNERS.map((d, i) => (
            <Cell key={d.model} fill={colors[i % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
