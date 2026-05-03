// Generated from C:/trading-agent-v1/pinescripts on 2026-05-02.
// Keep the website delivery page synced with the current QuantRead Pine sources.

export const quantModelVisualizerCode = String.raw`// ═══════════════════════════════════════════════════════════════════════════════
// Quant Model Visualizer v2.0
// Recreates every on-chart factor the Trading Agent v1 evaluates.
// v2.0 adds: visible EMA Ribbon, stop/target markers, Ichimoku baseline,
// RSI exhaustion warnings, and enhanced conviction dashboard.
// ═══════════════════════════════════════════════════════════════════════════════
//@version=6
// indicator("Quant Model Visualizer v2", shorttitle="Quant v2", overlay=true, max_labels_count=500, max_lines_count=500, max_boxes_count=500)
// Synced with bot guardrails: chase guard (3%), confirmation candle, Ichimoku baseline
// Last sync: 2026-03-31
indicator("Quant Model Visualizer v2", shorttitle="Quant v2", overlay=true, max_labels_count=500, max_lines_count=500, max_boxes_count=500)

// ─── USER INPUTS ─────────────────────────────────────────────────────────────
grp_atr    = "ATR Settings"
atrLen     = input.int(14,   "ATR Period",         group=grp_atr)
atrSmLen   = input.int(20,   "ATR SMA Lookback",   group=grp_atr)

grp_bot    = "QuantRead Sync"
botRegime  = input.string("BULL_QUIET", "Quant Trigger Fib", options=["BULL_TREND", "BULL_QUIET", "BULL_VOLATILE", "NEUTRAL", "CHOPPY", "BEAR_VOLATILE", "CUSTOM"], group=grp_bot)
customFib  = input.float(0.146, "Custom Trigger Fib", group=grp_bot, step=0.001)
showRef236 = input.bool(true, "Show 0.236 Reference", group=grp_bot)
showBotLvl = input.bool(true, "Show Quant Level Labels", group=grp_bot)

grp_map         = "Quant Daily Map"
showDailyMap    = input.bool(true, "Show Quant Daily Map", group=grp_map)
showMapChannels = input.bool(true, "Shade Quant Map channels", group=grp_map)
showMapLabels   = input.bool(true, "Show Quant Map labels", group=grp_map)
mapLookbackBars = input.int(156, "Auto swing lookback bars", minval=20, maxval=1000, group=grp_map)
mapDirection    = input.string("AUTO", "Move direction", options=["AUTO", "UP", "DOWN"], group=grp_map)
manualMapStart  = input.float(0.0, "Manual map start price, 0 = auto", group=grp_map, step=0.01)
manualMapEnd    = input.float(0.0, "Manual map end price, 0 = auto", group=grp_map, step=0.01)

grp_cloud  = "Trigger Cloud"
cloudLow   = input.float(1.25, "Cloud Lower Mult",  group=grp_cloud, step=0.05)
cloudHigh  = input.float(1.50, "Cloud Upper Mult",  group=grp_cloud, step=0.05)

grp_rvol   = "Relative Volume"
rvolLen    = input.int(20,   "RVOL SMA Period",     group=grp_rvol)
rvolThresh = input.float(1.25, "RVOL Entry Thresh", group=grp_rvol, step=0.05)
rvolORB    = input.float(1.618, "RVOL ORB Thresh (phi)", group=grp_rvol, step=0.01)

grp_ribbon = "1H EMA Ribbon (MTF)"
emaFast    = input.int(8,    "Fast EMA",            group=grp_ribbon)
emaMid     = input.int(21,   "Mid EMA",             group=grp_ribbon)
emaSlow    = input.int(34,   "Slow EMA",            group=grp_ribbon)
showRibbon = input.bool(true, "Show Ribbon Lines",  group=grp_ribbon)

grp_ichi   = "Ichimoku"
showIchi   = input.bool(true, "Show Ichimoku Baseline", group=grp_ichi)
ichiPeriod = input.int(26,   "Kijun-Sen Period",       group=grp_ichi)

grp_rsi    = "RSI Exhaustion"
rsiPeriod  = input.int(14,   "RSI Period",          group=grp_rsi)
rsiOB      = input.int(75,   "Overbought Threshold", group=grp_rsi)
rsiOS      = input.int(25,   "Oversold Threshold",   group=grp_rsi)
showRSIwrn = input.bool(true, "Show RSI Warnings",  group=grp_rsi)

grp_buy    = "BUY Signal"
showBuy    = input.bool(true, "Show BUY Labels",    group=grp_buy)
showStops  = input.bool(true, "Show Stop/Target on BUY", group=grp_buy)
showCat    = input.bool(true, "Show Catalyst Labels", group=grp_buy)
showTOD    = input.bool(true, "Show TOD Shading",   group=grp_buy)
showDash   = input.bool(true, "Show Dashboard",     group=grp_buy)

// ─── CORE CALCULATIONS ──────────────────────────────────────────────────────

// Wilder's ATR (RMA-based, matches Pine's built-in ta.atr)
atrVal     = ta.atr(atrLen)
atrSma20   = ta.sma(atrVal, atrSmLen)

// QuantRead anchor source. The live engine uses quote/daily previous close for
// trigger levels, not the chart's rolling session close.
prevClose = request.security(syminfo.tickerid, "D", close[1], lookahead=barmerge.lookahead_on)
dailyOpen = request.security(syminfo.tickerid, "D", open, lookahead=barmerge.lookahead_on)
isNewDay = ta.change(time("D")) != 0

// RSI
rsiVal     = ta.rsi(close, rsiPeriod)

// ═══════════════════════════════════════════════════════════════════════════════
//  LAYER 1 — QUANTREAD ATR LEVELS (Previous Close ± Fib × ATR)
// ═══════════════════════════════════════════════════════════════════════════════
// Use the DAILY ATR for level calculation (matches the bot exactly)
dailyATR = request.security(syminfo.tickerid, "D", ta.atr(atrLen), lookahead=barmerge.lookahead_on)

botTriggerFib = botRegime == "BULL_TREND" ? 0.118 : botRegime == "BULL_QUIET" ? 0.146 : botRegime == "BULL_VOLATILE" ? 0.146 : botRegime == "NEUTRAL" ? 0.236 : botRegime == "CHOPPY" ? 0.236 : botRegime == "BEAR_VOLATILE" ? 0.382 : customFib
upperTrigger = prevClose + (botTriggerFib * dailyATR)
lowerTrigger = prevClose - (botTriggerFib * dailyATR)
tp1Up        = prevClose + (0.382 * dailyATR)
tp1Down      = prevClose - (0.382 * dailyATR)
tp2Up        = prevClose + (0.500 * dailyATR)
tp2Down      = prevClose - (0.500 * dailyATR)
refUpper236  = prevClose + (0.236 * dailyATR)
refLower236  = prevClose - (0.236 * dailyATR)

pUT = plot(upperTrigger, "Quant Upper Trigger", color=color.new(color.lime, 20),   linewidth=2, style=plot.style_stepline_diamond)
plot(lowerTrigger, "Quant Lower Trigger", color=color.new(color.red, 20),    linewidth=2, style=plot.style_stepline_diamond)
plot(showRef236 ? refUpper236 : na, "Reference Upper 0.236", color=color.new(color.lime, 70), linewidth=1, style=plot.style_stepline)
plot(showRef236 ? refLower236 : na, "Reference Lower 0.236", color=color.new(color.red, 70), linewidth=1, style=plot.style_stepline)
pTP1 = plot(tp1Up,        "TP1 Up (0.382)",        color=color.new(color.aqua, 40),   linewidth=1, style=plot.style_stepline)
plot(tp1Down,      "TP1 Down (0.382)",      color=color.new(color.aqua, 40),   linewidth=1, style=plot.style_stepline)
plot(tp2Up,        "TP2 Up (0.500)",        color=color.new(color.blue, 40),   linewidth=1, style=plot.style_stepline)
plot(tp2Down,      "TP2 Down (0.500)",      color=color.new(color.blue, 40),   linewidth=1, style=plot.style_stepline)
plot(prevClose,    "Pivot (Prev Close)",    color=color.new(color.gray, 30),   linewidth=1, style=plot.style_cross)

var label botUpperLabel = na
var label botLowerLabel = na
if showBotLvl and barstate.islast
    if not na(botUpperLabel)
        label.delete(botUpperLabel)
    if not na(botLowerLabel)
        label.delete(botLowerLabel)
    botUpperLabel := label.new(bar_index + 2, upperTrigger, "Quant Upper " + str.tostring(botTriggerFib, "#.###") + "  " + str.tostring(upperTrigger, "#.##"), style=label.style_label_left, color=color.new(color.lime, 78), textcolor=color.white, size=size.small)
    botLowerLabel := label.new(bar_index + 2, lowerTrigger, "Quant Lower " + str.tostring(botTriggerFib, "#.###") + "  " + str.tostring(lowerTrigger, "#.##"), style=label.style_label_left, color=color.new(color.red, 78), textcolor=color.white, size=size.small)

// BUY ZONE: shaded area between Upper Trigger and TP1 — this is where entries happen
fill(pUT, pTP1, color=color.new(#00E676, 88), title="BUY ZONE Fill")

// -----------------------------------------------------------------------------
//  LAYER 1B - QUANT DAILY MAP (Fib channel playground)
// -----------------------------------------------------------------------------
autoMapHigh = ta.highest(high, mapLookbackBars)
autoMapLow = ta.lowest(low, mapLookbackBars)
barsFromMapHigh = ta.highestbars(high, mapLookbackBars)
barsFromMapLow = ta.lowestbars(low, mapLookbackBars)
autoMapIsUpMove = barsFromMapLow > barsFromMapHigh
mapIsUpMove = mapDirection == "UP" ? true : mapDirection == "DOWN" ? false : autoMapIsUpMove
mapStartPrice = manualMapStart > 0 ? manualMapStart : mapIsUpMove ? autoMapLow : autoMapHigh
mapEndPrice = manualMapEnd > 0 ? manualMapEnd : mapIsUpMove ? autoMapHigh : autoMapLow
mapRange = math.abs(mapEndPrice - mapStartPrice)

mapFib000 = mapEndPrice
mapFib236 = mapEndPrice + ((mapStartPrice - mapEndPrice) * 0.236)
mapFib382 = mapEndPrice + ((mapStartPrice - mapEndPrice) * 0.382)
mapFib500 = mapEndPrice + ((mapStartPrice - mapEndPrice) * 0.500)
mapFib618 = mapEndPrice + ((mapStartPrice - mapEndPrice) * 0.618)
mapFib786 = mapEndPrice + ((mapStartPrice - mapEndPrice) * 0.786)
mapFib100 = mapStartPrice

pMap000 = plot(showDailyMap ? mapFib000 : na, "Quant Map Fib 0.0", color=color.new(#F8FAFC, 35), linewidth=2, style=plot.style_stepline)
pMap236 = plot(showDailyMap ? mapFib236 : na, "Quant Map Fib 23.6", color=color.new(#22C55E, 25), linewidth=1, style=plot.style_stepline)
pMap382 = plot(showDailyMap ? mapFib382 : na, "Quant Map Fib 38.2", color=color.new(#38BDF8, 20), linewidth=1, style=plot.style_stepline)
pMap500 = plot(showDailyMap ? mapFib500 : na, "Quant Map Fib 50.0", color=color.new(#FBBF24, 5), linewidth=2, style=plot.style_stepline)
pMap618 = plot(showDailyMap ? mapFib618 : na, "Quant Map Fib 61.8", color=color.new(#A78BFA, 15), linewidth=1, style=plot.style_stepline)
pMap786 = plot(showDailyMap ? mapFib786 : na, "Quant Map Fib 78.6", color=color.new(#FB7185, 20), linewidth=1, style=plot.style_stepline)
pMap100 = plot(showDailyMap ? mapFib100 : na, "Quant Map Fib 100.0", color=color.new(#F8FAFC, 35), linewidth=2, style=plot.style_stepline)

mapFillOn = showDailyMap and showMapChannels
fill(pMap000, pMap236, color=mapFillOn ? color.new(#22C55E, 94) : na, title="Quant Map Channel 0-23.6")
fill(pMap236, pMap382, color=mapFillOn ? color.new(#38BDF8, 94) : na, title="Quant Map Channel 23.6-38.2")
fill(pMap382, pMap500, color=mapFillOn ? color.new(#FBBF24, 94) : na, title="Quant Map Channel 38.2-50")
fill(pMap500, pMap618, color=mapFillOn ? color.new(#A78BFA, 94) : na, title="Quant Map Channel 50-61.8")
fill(pMap618, pMap786, color=mapFillOn ? color.new(#FB7185, 94) : na, title="Quant Map Channel 61.8-78.6")
fill(pMap786, pMap100, color=mapFillOn ? color.new(#64748B, 94) : na, title="Quant Map Channel 78.6-100")

mapIn000236 = close >= math.min(mapFib000, mapFib236) and close <= math.max(mapFib000, mapFib236)
mapIn236382 = close >= math.min(mapFib236, mapFib382) and close <= math.max(mapFib236, mapFib382)
mapIn382500 = close >= math.min(mapFib382, mapFib500) and close <= math.max(mapFib382, mapFib500)
mapIn500618 = close >= math.min(mapFib500, mapFib618) and close <= math.max(mapFib500, mapFib618)
mapIn618786 = close >= math.min(mapFib618, mapFib786) and close <= math.max(mapFib618, mapFib786)
mapIn786100 = close >= math.min(mapFib786, mapFib100) and close <= math.max(mapFib786, mapFib100)
mapTop = math.max(mapStartPrice, mapEndPrice)
mapBottom = math.min(mapStartPrice, mapEndPrice)
mapChannel = mapIn000236 ? "0-23.6" : mapIn236382 ? "23.6-38.2" : mapIn382500 ? "38.2-50" : mapIn500618 ? "50-61.8" : mapIn618786 ? "61.8-78.6" : mapIn786100 ? "78.6-100" : close > mapTop ? "Above Map" : close < mapBottom ? "Below Map" : "Outside"

nearestAbove = 1000000000.0
nearestAbove := mapFib000 > close and mapFib000 < nearestAbove ? mapFib000 : nearestAbove
nearestAbove := mapFib236 > close and mapFib236 < nearestAbove ? mapFib236 : nearestAbove
nearestAbove := mapFib382 > close and mapFib382 < nearestAbove ? mapFib382 : nearestAbove
nearestAbove := mapFib500 > close and mapFib500 < nearestAbove ? mapFib500 : nearestAbove
nearestAbove := mapFib618 > close and mapFib618 < nearestAbove ? mapFib618 : nearestAbove
nearestAbove := mapFib786 > close and mapFib786 < nearestAbove ? mapFib786 : nearestAbove
nearestAbove := mapFib100 > close and mapFib100 < nearestAbove ? mapFib100 : nearestAbove
mapNextAbove = nearestAbove == 1000000000.0 ? na : nearestAbove

nearestBelow = -1000000000.0
nearestBelow := mapFib000 < close and mapFib000 > nearestBelow ? mapFib000 : nearestBelow
nearestBelow := mapFib236 < close and mapFib236 > nearestBelow ? mapFib236 : nearestBelow
nearestBelow := mapFib382 < close and mapFib382 > nearestBelow ? mapFib382 : nearestBelow
nearestBelow := mapFib500 < close and mapFib500 > nearestBelow ? mapFib500 : nearestBelow
nearestBelow := mapFib618 < close and mapFib618 > nearestBelow ? mapFib618 : nearestBelow
nearestBelow := mapFib786 < close and mapFib786 > nearestBelow ? mapFib786 : nearestBelow
nearestBelow := mapFib100 < close and mapFib100 > nearestBelow ? mapFib100 : nearestBelow
mapNextBelow = nearestBelow == -1000000000.0 ? na : nearestBelow

var label map000Label = na
var label map236Label = na
var label map382Label = na
var label map500Label = na
var label map618Label = na
var label map786Label = na
var label map100Label = na
if barstate.islast
    if not na(map000Label)
        label.delete(map000Label)
    if not na(map236Label)
        label.delete(map236Label)
    if not na(map382Label)
        label.delete(map382Label)
    if not na(map500Label)
        label.delete(map500Label)
    if not na(map618Label)
        label.delete(map618Label)
    if not na(map786Label)
        label.delete(map786Label)
    if not na(map100Label)
        label.delete(map100Label)
    if showDailyMap and showMapLabels
        map000Label := label.new(bar_index + 4, mapFib000, "Quant Map 0  " + str.tostring(mapFib000, "#.##"), style=label.style_label_left, color=color.new(#0F172A, 15), textcolor=color.white, size=size.tiny)
        map236Label := label.new(bar_index + 4, mapFib236, "Quant Map 23.6  " + str.tostring(mapFib236, "#.##"), style=label.style_label_left, color=color.new(#22C55E, 75), textcolor=color.white, size=size.tiny)
        map382Label := label.new(bar_index + 4, mapFib382, "Quant Map 38.2  " + str.tostring(mapFib382, "#.##"), style=label.style_label_left, color=color.new(#38BDF8, 75), textcolor=color.white, size=size.tiny)
        map500Label := label.new(bar_index + 4, mapFib500, "Quant Map 50  " + str.tostring(mapFib500, "#.##"), style=label.style_label_left, color=color.new(#FBBF24, 70), textcolor=color.black, size=size.tiny)
        map618Label := label.new(bar_index + 4, mapFib618, "Quant Map 61.8  " + str.tostring(mapFib618, "#.##"), style=label.style_label_left, color=color.new(#A78BFA, 72), textcolor=color.white, size=size.tiny)
        map786Label := label.new(bar_index + 4, mapFib786, "Quant Map 78.6  " + str.tostring(mapFib786, "#.##"), style=label.style_label_left, color=color.new(#FB7185, 72), textcolor=color.white, size=size.tiny)
        map100Label := label.new(bar_index + 4, mapFib100, "Quant Map 100  " + str.tostring(mapFib100, "#.##"), style=label.style_label_left, color=color.new(#0F172A, 15), textcolor=color.white, size=size.tiny)

// ═══════════════════════════════════════════════════════════════════════════════
//  LAYER 2 — TRIGGER CLOUD (Daily Open ± ATR bands)
// ═══════════════════════════════════════════════════════════════════════════════
upperCloudLo = dailyOpen + (cloudLow  * dailyATR)
upperCloudHi = dailyOpen + (cloudHigh * dailyATR)
lowerCloudHi = dailyOpen - (cloudLow  * dailyATR)
lowerCloudLo = dailyOpen - (cloudHigh * dailyATR)

ucl = plot(upperCloudLo, "Upper Cloud Lo", color=color.new(color.green, 85), display=display.none)
uch = plot(upperCloudHi, "Upper Cloud Hi", color=color.new(color.green, 85), display=display.none)
lcl = plot(lowerCloudLo, "Lower Cloud Lo", color=color.new(color.red, 85),   display=display.none)
lch = plot(lowerCloudHi, "Lower Cloud Hi", color=color.new(color.red, 85),   display=display.none)

fill(ucl, uch, color=color.new(color.green, 90), title="Upper Cloud Fill")
fill(lcl, lch, color=color.new(color.red, 90),   title="Lower Cloud Fill")

// Cloud status detection
inUpperCloud = close >= upperCloudLo and close <= upperCloudHi
inLowerCloud = close >= lowerCloudLo and close <= lowerCloudHi
inCloud      = inUpperCloud or inLowerCloud
belowCloud   = close < upperCloudLo and close > lowerCloudHi
aboveCloud   = close > upperCloudHi or close < lowerCloudLo

cloudStatus  = inCloud ? "STRIKE" : belowCloud ? "Early (Wait)" : "Extended"

// ═══════════════════════════════════════════════════════════════════════════════
//  LAYER 3 — 1H EMA RIBBON (Multi-Timeframe) — NOW WITH VISIBLE LINES
// ═══════════════════════════════════════════════════════════════════════════════
ema8_1h  = request.security(syminfo.tickerid, "60", ta.ema(close, emaFast),  lookahead=barmerge.lookahead_off)
ema21_1h = request.security(syminfo.tickerid, "60", ta.ema(close, emaMid),   lookahead=barmerge.lookahead_off)
ema34_1h = request.security(syminfo.tickerid, "60", ta.ema(close, emaSlow),  lookahead=barmerge.lookahead_off)

ribbonBull = ema8_1h > ema21_1h and ema21_1h > ema34_1h
ribbonBear = ema8_1h < ema21_1h and ema21_1h < ema34_1h

// Ribbon background shading
ribbonColor = ribbonBull ? color.new(color.lime, 92) : ribbonBear ? color.new(color.red, 92) : na
bgcolor(ribbonColor, title="1H Ribbon Background", offset=0)

ribbonLabel = ribbonBull ? "BULL" : ribbonBear ? "BEAR" : "FLAT"

// ── VISIBLE EMA RIBBON LINES ────────────────────────────────────────────────
// Color-coded: bright when aligned (bull=green, bear=red), dim when flat
ema8Color  = showRibbon ? (ribbonBull ? color.new(#00E676, 10) : ribbonBear ? color.new(#FF5252, 10) : color.new(color.gray, 50)) : na
ema21Color = showRibbon ? (ribbonBull ? color.new(#69F0AE, 25) : ribbonBear ? color.new(#FF8A80, 25) : color.new(color.gray, 60)) : na
ema34Color = showRibbon ? (ribbonBull ? color.new(#B9F6CA, 35) : ribbonBear ? color.new(#FFCDD2, 35) : color.new(color.gray, 70)) : na

pEma8  = plot(showRibbon ? ema8_1h  : na, "1H EMA 8",  color=ema8Color,  linewidth=2)
pEma21 = plot(showRibbon ? ema21_1h : na, "1H EMA 21", color=ema21Color, linewidth=1)
pEma34 = plot(showRibbon ? ema34_1h : na, "1H EMA 34", color=ema34Color, linewidth=1)

// Ribbon fill between fast and slow — green when bull, red when bear
ribbonFillColor = ribbonBull ? color.new(#00E676, 85) : ribbonBear ? color.new(#FF5252, 85) : na
fill(pEma8, pEma34, color=ribbonFillColor, title="EMA Ribbon Fill")

// ═══════════════════════════════════════════════════════════════════════════════
//  LAYER 4 — RELATIVE VOLUME (RVOL)
// ═══════════════════════════════════════════════════════════════════════════════
volSma     = ta.sma(volume, rvolLen)
rvol       = volSma > 0 ? volume / volSma : 0.0

rvolCatHit = rvol >= 2.5
rvolORBHit = rvol >= rvolORB
rvolStdHit = rvol >= rvolThresh

// ═══════════════════════════════════════════════════════════════════════════════
//  LAYER 5 — VOLATILITY EXPANSION GAUGE
// ═══════════════════════════════════════════════════════════════════════════════
atrRatio    = atrSma20 > 0 ? atrVal / atrSma20 : 1.0
volExpand   = atrRatio >= 1.4
volContract = atrRatio < 1.25
volNeutral  = not volExpand and not volContract

// Vol state diamonds — on FIRST bar of a new state
volExpandStart   = volExpand and not volExpand[1]
volContractStart = volContract and not volContract[1]
plotshape(volExpandStart   ? high : na, style=shape.diamond, location=location.abovebar, color=color.new(color.lime, 30),  size=size.tiny, title="Vol Expanding")
plotshape(volContractStart ? low  : na, style=shape.diamond, location=location.belowbar, color=color.new(color.red, 30),   size=size.tiny, title="Vol Contracting")

// ═══════════════════════════════════════════════════════════════════════════════
//  LAYER 6 — ICHIMOKU BASELINE (Kijun-Sen)
// ═══════════════════════════════════════════════════════════════════════════════
ichiHigh = ta.highest(high, ichiPeriod)
ichiLow  = ta.lowest(low, ichiPeriod)
kikunSen = (ichiHigh + ichiLow) / 2.0
plot(showIchi ? kikunSen : na, "Ichimoku Baseline", color=color.new(#FF6F00, 30), linewidth=1, style=plot.style_stepline)

// Price vs. Ichimoku
aboveIchi = close > kikunSen
belowIchi = close < kikunSen

// ═══════════════════════════════════════════════════════════════════════════════
//  LAYER 7 — RSI EXHAUSTION WARNINGS
// ═══════════════════════════════════════════════════════════════════════════════
rsiOverbought = rsiVal >= rsiOB
rsiOversold   = rsiVal <= rsiOS

// Show warning on FIRST bar crossing into exhaustion
rsiOBenter = rsiOverbought and not rsiOverbought[1]
rsiOSenter = rsiOversold and not rsiOversold[1]

plotshape(showRSIwrn and rsiOBenter ? high : na, style=shape.xcross, location=location.abovebar, color=color.new(#FF5252, 0), size=size.small, title="RSI Exhausted (OB)", text="RSI EXH", textcolor=color.new(#FF5252, 20))
plotshape(showRSIwrn and rsiOSenter ? low  : na, style=shape.xcross, location=location.belowbar, color=color.new(#69F0AE, 0), size=size.small, title="RSI Oversold",      text="RSI OS",  textcolor=color.new(#69F0AE, 20))

// ═══════════════════════════════════════════════════════════════════════════════
//  LAYER 8 — TIME-OF-DAY WINDOW HIGHLIGHTING
// ═══════════════════════════════════════════════════════════════════════════════
etHour   = hour(time, "America/New_York")
etMinute = minute(time, "America/New_York")
etMins   = etHour * 60 + etMinute

// Optimal windows: 9:30–11:30 ET and 14:00–15:45 ET (synced with execution_engine.py)
inMorningWindow   = etMins >= 570  and etMins <= 690
inAfternoonWindow = etMins >= 840  and etMins <= 945
inOptimalTOD      = inMorningWindow or inAfternoonWindow

// ORB window: 9:30–9:49 ET
inORBWindow = etMins >= 570 and etMins <= 589

// Cautious ORB: 9:30–10:00 ET (system blocks counter-trend trades in this window)
inCautiousORB = etMins >= 570 and etMins <= 600

bgcolor(showTOD and inOptimalTOD ? color.new(color.teal, 93) : na, title="Optimal TOD Window")
bgcolor(showTOD and inORBWindow  ? color.new(color.orange, 90) : na, title="ORB Window (9:30-9:49)")

todLabel = inOptimalTOD ? "OPTIMAL" : inORBWindow ? "ORB" : "Off-Hours"

// ═══════════════════════════════════════════════════════════════════════════════
//  LAYER 9 — GAP % & CATALYST DETECTION
// ═══════════════════════════════════════════════════════════════════════════════
gapPct     = prevClose > 0 ? ((dailyOpen - prevClose) / prevClose) * 100.0 : 0.0
isCatalyst = math.abs(gapPct) > 4.0 and rvol > 2.5
isGap      = math.abs(gapPct) > 2.0

// isNewDay is now computed at the top of the script
plotshape(showCat and isCatalyst and isNewDay ? low : na, style=shape.triangleup, location=location.belowbar, color=color.new(color.purple, 0), size=size.normal, title="CATALYST", text="CATALYST 1.618x", textcolor=color.purple)
plotshape(showCat and isGap and not isCatalyst and isNewDay ? low : na, style=shape.triangleup, location=location.belowbar, color=color.new(color.blue, 40), size=size.small, title="GAP", text="GAP", textcolor=color.blue)

// ═══════════════════════════════════════════════════════════════════════════════
//  LAYER 10 — COMPOSITE BUY SIGNAL + STOP/TARGET MARKERS
// ═══════════════════════════════════════════════════════════════════════════════
rvolGatePass = inORBWindow ? rvolORBHit : rvolStdHit

botLongHit = close >= upperTrigger
botShortHit = close <= lowerTrigger
botLongCross = botLongHit and close[1] < upperTrigger
botShortCross = botShortHit and close[1] > lowerTrigger
triggerCross = botLongCross

// Confirmation Candle: MUST close green (matches bot's is_bullish_confirm)
isBullishConfirm = close > open

// Chase Guard: Do not buy if price is > 3% above trigger (matches bot's max_chase_pct)
chaseLimit = 0.03
isOverextended = (close - upperTrigger) / upperTrigger > chaseLimit

// Matches Python WebSocket checks: Trigger + Confirm + Vol + Ribbon + TOD + Chase Guard
buySignal = triggerCross and isBullishConfirm and rvolGatePass and ribbonBull and inOptimalTOD and not isOverextended

// RSI exhaustion OR Ichimoku baseline loss blocks the BUY (matching the bot)
buyBlocked = rsiOverbought or belowIchi

// Final BUY: passes all gates including blockers
buyFire = buySignal and not buyBlocked and not buySignal[1]

// Blocked BUY tracking (broken out by reason for clarity on the chart)
blockedRSI = buySignal and rsiOverbought and not belowIchi and not (buySignal[1] and rsiOverbought[1])
blockedIchi = buySignal and belowIchi and not (buySignal[1] and belowIchi[1])
blockedChase = triggerCross and isBullishConfirm and rvolGatePass and ribbonBull and inOptimalTOD and isOverextended and not (triggerCross[1] and isOverextended[1])
blockedConfirm = triggerCross and not isBullishConfirm and rvolGatePass and ribbonBull and inOptimalTOD and not (triggerCross[1] and not isBullishConfirm[1])

// BUY candle highlight
bgcolor(showBuy and buyFire ? color.new(#00E676, 75) : na, title="BUY Candle Highlight")
plotshape(showBuy and buyFire ? low : na, style=shape.triangleup, location=location.belowbar, color=color.new(#00E676, 0), size=size.large, title="BUY Signal", text="BUY", textcolor=color.new(#00E676, 0))
plotshape(showBuy and botShortCross ? high : na, style=shape.triangledown, location=location.abovebar, color=color.new(#FF5252, 0), size=size.normal, title="Quant Short Trigger", text="SHORT TRIG", textcolor=color.new(#FF5252, 10))

// Blocked BUY labels (red X where it would have entered)
plotshape(showBuy and blockedRSI ? high : na, style=shape.xcross, location=location.abovebar, color=color.new(#FF9800, 0), size=size.normal, title="Blocked RSI", text="BLOCKED RSI EXH", textcolor=color.new(#FF9800, 20))
plotshape(showBuy and blockedIchi ? high : na, style=shape.xcross, location=location.abovebar, color=color.new(#E65100, 0), size=size.normal, title="Blocked Ichi", text="BLOCKED BELOW ICHI", textcolor=color.new(#E65100, 20))
plotshape(showBuy and blockedChase ? high : na, style=shape.xcross, location=location.abovebar, color=color.new(#E91E63, 0), size=size.normal, title="Blocked Chase", text="BLOCKED CHASE >3%", textcolor=color.new(#E91E63, 20))
plotshape(showBuy and blockedConfirm ? low : na, style=shape.xcross, location=location.belowbar, color=color.new(#9C27B0, 0), size=size.normal, title="Blocked Confirm", text="BLOCKED RED CANDLE", textcolor=color.new(#9C27B0, 20))

// ── STOP-LOSS & TAKE-PROFIT MARKERS ON BUY ─────────────────────────────────
// The bot uses: Stop = Entry - (1.0 × Daily ATR), Target = TP1 (0.382 × ATR above prev close)
// We mark these as horizontal rays extending right from the buy bar.
var float entryPrice  = na
var float stopPrice   = na
var float targetPrice = na
var int   entryBar    = na

// Track the last BUY signal position
if buyFire
    entryPrice  := close
    stopPrice   := close - (1.0 * dailyATR)    // 1 ATR stop below entry
    targetPrice := tp1Up                         // TP1 (0.382 fib level)
    entryBar    := bar_index

// Draw stop/target lines that extend from entry bar to +20 bars ahead
if showStops and not na(entryBar) and bar_index == entryBar
    // Entry line (white dashed)
    line.new(bar_index, entryPrice, bar_index + 20, entryPrice, color=color.new(color.white, 40), width=1, style=line.style_dashed)
    label.new(bar_index + 20, entryPrice, "ENTRY " + str.tostring(entryPrice, "#.##"), style=label.style_label_left, color=color.new(color.white, 85), textcolor=color.white, size=size.tiny)

    // Stop line (red solid)
    line.new(bar_index, stopPrice, bar_index + 20, stopPrice, color=color.new(#FF5252, 20), width=2, style=line.style_solid)
    label.new(bar_index + 20, stopPrice, "STOP " + str.tostring(stopPrice, "#.##"), style=label.style_label_left, color=color.new(#FF5252, 85), textcolor=#FF5252, size=size.tiny)

    // Target line (green solid)
    line.new(bar_index, targetPrice, bar_index + 20, targetPrice, color=color.new(#00E676, 20), width=2, style=line.style_solid)
    label.new(bar_index + 20, targetPrice, "TP1 " + str.tostring(targetPrice, "#.##"), style=label.style_label_left, color=color.new(#00E676, 85), textcolor=#00E676, size=size.tiny)

// ── R-MULTIPLE MARKER ───────────────────────────────────────────────────────
// Shows the Risk:Reward ratio on the buy label
rMultiple = not na(entryPrice) and not na(stopPrice) and not na(targetPrice) and (entryPrice - stopPrice) > 0 ? (targetPrice - entryPrice) / (entryPrice - stopPrice) : na

// ── CONVICTION ESTIMATE ─────────────────────────────────────────────────────
f_cloud   = inUpperCloud ? 1.618 : 1.0
f_vol     = volExpand ? 1.236 : volContract ? 0.618 : 1.0
f_ribbon  = ribbonBull ? 1.236 : ribbonBear ? 0.786 : 1.0
f_tod     = inOptimalTOD ? 1.272 : 0.9
f_cat     = isCatalyst ? 1.618 : 1.0
f_ichi    = aboveIchi ? 1.10 : 0.90
f_rsi     = rsiOverbought ? 0.50 : rsiOversold ? 1.15 : 1.0

convictionEst = 1.0 * f_cloud * f_vol * f_ribbon * f_tod * f_cat * f_ichi * f_rsi

// ═══════════════════════════════════════════════════════════════════════════════
//  LAYER 11 — ENHANCED INFO DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
if showDash and barstate.islast
    var table dash = table.new(position.top_right, 2, 20, border_width=1, border_color=color.new(color.gray, 60), bgcolor=color.new(#1a1a2e, 10))

    // Header
    table.cell(dash, 0, 0, "Quant v2",        text_color=color.new(#00E676, 0), text_size=size.small, bgcolor=color.new(#16213e, 0), text_halign=text.align_left)
    table.cell(dash, 1, 0, "Value",          text_color=color.new(color.white, 0), text_size=size.small, bgcolor=color.new(#16213e, 0), text_halign=text.align_right)

    // ATR
    table.cell(dash, 0, 1, "ATR (14)",       text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 1, str.tostring(atrVal, "#.##"), text_color=color.white, text_size=size.small, text_halign=text.align_right)

    // RVOL
    rvolColor = rvolCatHit ? color.lime : rvolStdHit ? color.yellow : color.red
    table.cell(dash, 0, 2, "RVOL",           text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 2, str.tostring(rvol, "#.##") + "x", text_color=rvolColor, text_size=size.small, text_halign=text.align_right)

    // ATR Ratio (Volatility State)
    atrRatColor = volExpand ? color.lime : volContract ? color.red : color.yellow
    volStateStr = volExpand ? "EXPAND" : volContract ? "QUIET" : "NORMAL"
    table.cell(dash, 0, 3, "Vol State",      text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 3, volStateStr + " (" + str.tostring(atrRatio, "#.##") + "x)", text_color=atrRatColor, text_size=size.small, text_halign=text.align_right)

    // Gap %
    gapColor = isCatalyst ? color.purple : isGap ? color.aqua : color.gray
    table.cell(dash, 0, 4, "Gap %",          text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 4, str.tostring(gapPct, "#.##") + "%", text_color=gapColor, text_size=size.small, text_halign=text.align_right)

    // 1H Ribbon
    ribColor = ribbonBull ? color.lime : ribbonBear ? color.red : color.gray
    table.cell(dash, 0, 5, "1H Ribbon",      text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 5, ribbonLabel,       text_color=ribColor, text_size=size.small, text_halign=text.align_right)

    // Cloud Status
    cldColor = inCloud ? color.lime : belowCloud ? color.yellow : color.red
    table.cell(dash, 0, 6, "Cloud",           text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 6, cloudStatus,        text_color=cldColor, text_size=size.small, text_halign=text.align_right)

    // TOD
    todColor   = inOptimalTOD ? color.lime : color.gray
    cautionStr = inCautiousORB ? " !ORB" : ""
    table.cell(dash, 0, 7, "TOD Window",      text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 7, todLabel + cautionStr, text_color=todColor, text_size=size.small, text_halign=text.align_right)

    // RSI
    rsiColor = rsiOverbought ? color.red : rsiOversold ? color.lime : color.white
    rsiStr = str.tostring(rsiVal, "#.#")
    rsiState = rsiOverbought ? " EXHAUSTED" : rsiOversold ? " OVERSOLD" : ""
    table.cell(dash, 0, 8, "RSI (14)",       text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 8, rsiStr + rsiState, text_color=rsiColor, text_size=size.small, text_halign=text.align_right)

    // Ichimoku Baseline
    ichiColor = aboveIchi ? color.lime : color.red
    ichiStr = aboveIchi ? "ABOVE" : "BELOW"
    table.cell(dash, 0, 9, "Ichimoku BL",    text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 9, ichiStr,            text_color=ichiColor, text_size=size.small, text_halign=text.align_right)

    // Trigger Distance
    longDist = upperTrigger > 0 ? ((close - upperTrigger) / upperTrigger) * 100 : 0
    shortDist = lowerTrigger > 0 ? ((lowerTrigger - close) / lowerTrigger) * 100 : 0
    activeDist = close >= prevClose ? longDist : shortDist
    trigDistColor = botLongHit ? color.lime : botShortHit ? color.red : activeDist > -2 ? color.yellow : color.gray
    trigHitStr = botLongHit ? "LONG HIT" : botShortHit ? "SHORT HIT" : str.tostring(activeDist, "#.##") + "%"
    table.cell(dash, 0, 10, "Trigger Dist",   text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 10, trigHitStr,        text_color=trigDistColor, text_size=size.small, text_halign=text.align_right)

    // R-Multiple (if we have a recent trade)
    rStr = not na(rMultiple) ? str.tostring(rMultiple, "#.##") + "R" : "-"
    rColor = not na(rMultiple) and rMultiple >= 2.0 ? color.lime : not na(rMultiple) and rMultiple >= 1.0 ? color.yellow : color.gray
    table.cell(dash, 0, 11, "R-Multiple",     text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 11, rStr,              text_color=rColor, text_size=size.small, text_halign=text.align_right)

    // Conviction Estimate (now includes Ichimoku + RSI factors)
    convColor = convictionEst >= 2.0 ? color.new(#00E676, 0) : convictionEst >= 1.5 ? color.lime : convictionEst >= 1.0 ? color.yellow : color.red
    convGrade = convictionEst >= 2.5 ? "S" : convictionEst >= 2.0 ? "A" : convictionEst >= 1.5 ? "B" : convictionEst >= 1.0 ? "C" : "D"
    table.cell(dash, 0, 12, "Conviction",     text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 12, convGrade + " (" + str.tostring(convictionEst, "#.##") + "x)", text_color=convColor, text_size=size.small, text_halign=text.align_right)

    // QuantRead sync diagnostics
    table.cell(dash, 0, 13, "Quant Anchor",    text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 13, "Prev " + str.tostring(prevClose, "#.##"), text_color=color.white, text_size=size.small, text_halign=text.align_right)
    table.cell(dash, 0, 14, "Quant Fib",       text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 14, botRegime + " " + str.tostring(botTriggerFib, "#.###"), text_color=color.new(#00E676, 0), text_size=size.small, text_halign=text.align_right)
    table.cell(dash, 0, 15, "Quant U/L",       text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 15, str.tostring(upperTrigger, "#.##") + " / " + str.tostring(lowerTrigger, "#.##"), text_color=color.white, text_size=size.small, text_halign=text.align_right)

    // Quant Daily Map diagnostics
    table.cell(dash, 0, 16, "Map Move",        text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 16, mapIsUpMove ? "UP" : "DOWN", text_color=mapIsUpMove ? color.lime : color.red, text_size=size.small, text_halign=text.align_right)
    table.cell(dash, 0, 17, "Map Channel",     text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 17, mapChannel, text_color=color.new(#FBBF24, 0), text_size=size.small, text_halign=text.align_right)
    table.cell(dash, 0, 18, "Next Up Level",   text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 18, na(mapNextAbove) ? "N/A" : str.tostring(mapNextAbove, "#.##"), text_color=na(mapNextAbove) ? color.gray : color.lime, text_size=size.small, text_halign=text.align_right)
    table.cell(dash, 0, 19, "Next Down Level", text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(dash, 1, 19, na(mapNextBelow) ? "N/A" : str.tostring(mapNextBelow, "#.##"), text_color=na(mapNextBelow) ? color.gray : color.red, text_size=size.small, text_halign=text.align_right)

// ═══════════════════════════════════════════════════════════════════════════════
//  ALERTS
// ═══════════════════════════════════════════════════════════════════════════════
alertcondition(buyFire, title="Quant BUY Signal", message="{{ticker}} Quant BUY: All gates passed at {{close}}")
alertcondition(blockedRSI, title="BUY Blocked (RSI)", message="{{ticker}} BUY BLOCKED by RSI exhaustion at {{close}}")
alertcondition(isCatalyst and isNewDay, title="CATALYST Detected", message="{{ticker}} CATALYST detected at {{close}} with high gap and RVOL")
alertcondition(rsiOBenter, title="RSI Exhaustion Warning", message="{{ticker}} RSI exhausted (overbought) at {{close}}")
`;

export const convictionHistogramCode = String.raw`// ═══════════════════════════════════════════════════════════════════════════════
// Quant Conviction Histogram v2.0
// Companion indicator to Quant Model Visualizer — runs in a separate pane.
// Shows conviction strength as a color-coded histogram with individual factor
// contribution bars and RSI overlay.
// ═══════════════════════════════════════════════════════════════════════════════
//@version=6
indicator("Quant Conviction Histogram", shorttitle="Quant Conviction", format=format.price, precision=2)

// ─── INPUTS ─────────────────────────────────────────────────────────────────
grp_settings = "Settings"
atrLen     = input.int(14,       "ATR Period",           group=grp_settings)
atrSmLen   = input.int(20,       "ATR SMA Lookback",     group=grp_settings)
rvolLen    = input.int(20,       "RVOL SMA Period",      group=grp_settings)
emaFast    = input.int(8,        "1H EMA Fast",          group=grp_settings)
emaMid     = input.int(21,       "1H EMA Mid",           group=grp_settings)
emaSlow    = input.int(34,       "1H EMA Slow",          group=grp_settings)
ichiPeriod = input.int(26,       "Ichimoku Period",      group=grp_settings)
rsiPeriod  = input.int(14,       "RSI Period",           group=grp_settings)

grp_display = "Display"
showRSI    = input.bool(true,    "Show RSI Sub-Line",    group=grp_display)
showGrade  = input.bool(true,    "Show Grade Labels",    group=grp_display)
showBreak  = input.bool(true,    "Show Factor Breakdown", group=grp_display)

// ─── RECREATE ALL FACTORS ───────────────────────────────────────────────────
// (Must be recalculated since Pine Scripts can't share data between indicators)

// ATR & Volatility
atrVal     = ta.atr(atrLen)
atrSma20   = ta.sma(atrVal, atrSmLen)
atrRatio   = atrSma20 > 0 ? atrVal / atrSma20 : 1.0
volExpand  = atrRatio >= 1.4
volContract = atrRatio < 1.25

// Daily levels
dailyATR   = request.security(syminfo.tickerid, "D", ta.atr(atrLen), lookahead=barmerge.lookahead_on)

// Core Session State Tracking (Fixes Extended Hours Lag Bug)
var float prevClose = na
var float dailyOpen = na
isNewDay = ta.change(time("D")) != 0
if isNewDay
    prevClose := close[1]
    dailyOpen := open

// Upper trigger & cloud
upperTrigger = prevClose + (0.146 * dailyATR)
upperCloudLo = dailyOpen + (1.25 * dailyATR)
upperCloudHi = dailyOpen + (1.50 * dailyATR)
lowerCloudHi = dailyOpen - (1.25 * dailyATR)
inUpperCloud = close >= upperCloudLo and close <= upperCloudHi
inLowerCloud = close >= (dailyOpen - (1.50 * dailyATR)) and close <= lowerCloudHi
inCloud      = inUpperCloud or inLowerCloud

// 1H EMA Ribbon
ema8_1h  = request.security(syminfo.tickerid, "60", ta.ema(close, emaFast),  lookahead=barmerge.lookahead_off)
ema21_1h = request.security(syminfo.tickerid, "60", ta.ema(close, emaMid),   lookahead=barmerge.lookahead_off)
ema34_1h = request.security(syminfo.tickerid, "60", ta.ema(close, emaSlow),  lookahead=barmerge.lookahead_off)
ribbonBull = ema8_1h > ema21_1h and ema21_1h > ema34_1h
ribbonBear = ema8_1h < ema21_1h and ema21_1h < ema34_1h

// RVOL
volSma = ta.sma(volume, rvolLen)
rvol   = volSma > 0 ? volume / volSma : 0.0

// TOD
etHour   = hour(time, "America/New_York")
etMinute = minute(time, "America/New_York")
etMins   = etHour * 60 + etMinute
inMorningWindow   = etMins >= 570  and etMins <= 690
inAfternoonWindow = etMins >= 840  and etMins <= 945
inOptimalTOD      = inMorningWindow or inAfternoonWindow

// Gap & Catalyst
gapPct     = prevClose > 0 ? ((dailyOpen - prevClose) / prevClose) * 100.0 : 0.0
isCatalyst = math.abs(gapPct) > 4.0 and rvol > 2.5

// Ichimoku
ichiHigh = ta.highest(high, ichiPeriod)
ichiLow  = ta.lowest(low, ichiPeriod)
kikunSen = (ichiHigh + ichiLow) / 2.0
aboveIchi = close > kikunSen

// RSI
rsiVal = ta.rsi(close, rsiPeriod)

// ─── FACTOR MULTIPLIERS ────────────────────────────────────────────────────
f_cloud   = inCloud ? 1.618 : 1.0
f_vol     = volExpand ? 1.236 : volContract ? 0.618 : 1.0
f_ribbon  = ribbonBull ? 1.236 : ribbonBear ? 0.786 : 1.0
f_tod     = inOptimalTOD ? 1.272 : 0.9
f_cat     = isCatalyst ? 1.618 : 1.0
f_ichi    = aboveIchi ? 1.10 : 0.90
f_rsi     = rsiVal >= 75 ? 0.50 : rsiVal <= 25 ? 1.15 : 1.0

// Composite conviction
conviction = f_cloud * f_vol * f_ribbon * f_tod * f_cat * f_ichi * f_rsi

// ─── CONVICTION HISTOGRAM ──────────────────────────────────────────────────
// Color based on grade: S(≥2.5)=bright green, A(≥2.0)=green, B(≥1.5)=yellow,
// C(≥1.0)=orange, D(<1.0)=red
barColor = conviction >= 2.5 ? color.new(#00E676, 0) :
           conviction >= 2.0 ? color.new(#69F0AE, 0) :
           conviction >= 1.5 ? color.new(#FFD600, 0) :
           conviction >= 1.0 ? color.new(#FF9800, 0) :
                               color.new(#FF5252, 0)

plot(conviction, "Conviction", color=barColor, style=plot.style_columns, linewidth=3)

// Conviction thresholds
hline(2.5, "S Grade",   color=color.new(#00E676, 60), linestyle=hline.style_dotted)
hline(2.0, "A Grade",   color=color.new(#69F0AE, 60), linestyle=hline.style_dotted)
hline(1.5, "B Grade",   color=color.new(#FFD600, 70), linestyle=hline.style_dotted)
hline(1.0, "C Grade",   color=color.new(#FF9800, 70), linestyle=hline.style_dotted)

// ─── RSI SUB-LINE (SCALED TO FIT) ─────────────────────────────────────────
// RSI scaled from 0-100 down to 0-3 range to fit the conviction histogram
scaledRSI = rsiVal / 33.33
rsiColor  = rsiVal >= 75 ? color.new(#FF5252, 20) : rsiVal <= 25 ? color.new(#69F0AE, 20) : color.new(color.gray, 40)
plot(showRSI ? scaledRSI : na, "RSI (scaled)", color=rsiColor, linewidth=1, style=plot.style_line)

// ─── RVOL DOTS ─────────────────────────────────────────────────────────────
// Show RVOL >= 2.5 as a dot at the bottom
plotshape(rvol >= 2.5 ? 0.1 : na, style=shape.circle, location=location.absolute, color=color.new(color.purple, 0), size=size.tiny, title="RVOL CATALYST")
plotshape(rvol >= 1.618 and rvol < 2.5 ? 0.1 : na, style=shape.circle, location=location.absolute, color=color.new(color.blue, 30), size=size.tiny, title="RVOL φ")

// ─── GRADE LABELS (at major transitions only) ──────────────────────────────
grade     = conviction >= 2.5 ? "S" : conviction >= 2.0 ? "A" : conviction >= 1.5 ? "B" : conviction >= 1.0 ? "C" : "D"
prevGrade = conviction[1] >= 2.5 ? "S" : conviction[1] >= 2.0 ? "A" : conviction[1] >= 1.5 ? "B" : conviction[1] >= 1.0 ? "C" : "D"

// Only label when conviction grade changes
gradeChange = grade != prevGrade
if showGrade and gradeChange
    lblColor = conviction >= 2.0 ? color.new(#00E676, 0) : conviction >= 1.5 ? color.new(#FFD600, 0) : conviction >= 1.0 ? color.new(#FF9800, 0) : color.new(#FF5252, 0)
    label.new(bar_index, conviction, grade, style=label.style_label_down, color=color.new(lblColor, 70), textcolor=lblColor, size=size.small)

// ─── FACTOR BREAKDOWN TABLE ────────────────────────────────────────────────
if showBreak and barstate.islast
    var table fb = table.new(position.bottom_right, 2, 9, border_width=1, border_color=color.new(color.gray, 60), bgcolor=color.new(#1a1a2e, 10))

    table.cell(fb, 0, 0, "Factor",    text_color=color.new(#00E676, 0), text_size=size.small, bgcolor=color.new(#16213e, 0), text_halign=text.align_left)
    table.cell(fb, 1, 0, "Mult",      text_color=color.new(#00E676, 0), text_size=size.small, bgcolor=color.new(#16213e, 0), text_halign=text.align_right)

    _fc = f_cloud >= 1.5 ? color.lime : color.gray
    table.cell(fb, 0, 1, "Cloud",     text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(fb, 1, 1, str.tostring(f_cloud, "#.###") + "x", text_color=_fc, text_size=size.small, text_halign=text.align_right)

    _fv = f_vol > 1.0 ? color.lime : f_vol < 1.0 ? color.red : color.gray
    table.cell(fb, 0, 2, "Volatility", text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(fb, 1, 2, str.tostring(f_vol, "#.###") + "x", text_color=_fv, text_size=size.small, text_halign=text.align_right)

    _fr = f_ribbon > 1.0 ? color.lime : f_ribbon < 1.0 ? color.red : color.gray
    table.cell(fb, 0, 3, "Ribbon",    text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(fb, 1, 3, str.tostring(f_ribbon, "#.###") + "x", text_color=_fr, text_size=size.small, text_halign=text.align_right)

    _ft = f_tod > 1.0 ? color.lime : color.gray
    table.cell(fb, 0, 4, "TOD",       text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(fb, 1, 4, str.tostring(f_tod, "#.###") + "x", text_color=_ft, text_size=size.small, text_halign=text.align_right)

    _fca = f_cat > 1.0 ? color.purple : color.gray
    table.cell(fb, 0, 5, "Catalyst",  text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(fb, 1, 5, str.tostring(f_cat, "#.###") + "x", text_color=_fca, text_size=size.small, text_halign=text.align_right)

    _fi = f_ichi > 1.0 ? color.lime : color.red
    table.cell(fb, 0, 6, "Ichimoku",  text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(fb, 1, 6, str.tostring(f_ichi, "#.###") + "x", text_color=_fi, text_size=size.small, text_halign=text.align_right)

    _frs = f_rsi < 1.0 ? color.red : f_rsi > 1.0 ? color.lime : color.gray
    table.cell(fb, 0, 7, "RSI",       text_color=color.silver, text_size=size.small, text_halign=text.align_left)
    table.cell(fb, 1, 7, str.tostring(f_rsi, "#.###") + "x", text_color=_frs, text_size=size.small, text_halign=text.align_right)

    _cc = conviction >= 2.0 ? color.new(#00E676, 0) : conviction >= 1.5 ? color.lime : conviction >= 1.0 ? color.yellow : color.red
    table.cell(fb, 0, 8, "TOTAL",     text_color=color.white, text_size=size.small, bgcolor=color.new(#16213e, 0), text_halign=text.align_left)
    table.cell(fb, 1, 8, grade + " (" + str.tostring(conviction, "#.##") + "x)", text_color=_cc, text_size=size.small, bgcolor=color.new(#16213e, 0), text_halign=text.align_right)

// ═══════════════════════════════════════════════════════════════════════════════
//  ALERTS
// ═══════════════════════════════════════════════════════════════════════════════
alertcondition(conviction >= 2.5 and conviction[1] < 2.5, title="S-Grade Conviction", message="{{ticker}} conviction reached S-GRADE ({{plot_0}}x)")
alertcondition(conviction >= 2.0 and conviction[1] < 2.0, title="A-Grade Conviction", message="{{ticker}} conviction reached A-GRADE ({{plot_0}}x)")
alertcondition(conviction < 1.0 and conviction[1] >= 1.0, title="D-Grade Warning", message="{{ticker}} conviction dropped to D-GRADE ({{plot_0}}x)")
`;
