// stylelint-disable
import styled, { css } from 'utils/styled-components';

import { inputStyles } from '../Input';

import flags from './flags';
import flags2 from './flags@2x';

const dropdownStyles = css`
  .intl-tel-input {
    position: relative;
    display: inline-block;
  }
  .intl-tel-input * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  .intl-tel-input .hide {
    display: none;
  }
  .intl-tel-input .v-hide {
    visibility: hidden;
  }
  .intl-tel-input input,
  .intl-tel-input input[type='tel'],
  .intl-tel-input input[type='text'] {
    position: relative;
    z-index: 0;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    padding-right: 36px;
    margin-right: 0;
  }
  .intl-tel-input .flag-container {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 1px;
  }
  .intl-tel-input .selected-flag {
    outline: none;
    z-index: 1;
    position: relative;
    width: 36px;
    height: 100%;
    padding: 0 0 0 8px;
  }
  .intl-tel-input .selected-flag .iti-flag {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .intl-tel-input .selected-flag .iti-arrow {
    position: absolute;
    top: 50%;
    margin-top: -2px;
    right: 6px;
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 4px solid #555;
  }
  .intl-tel-input .selected-flag .iti-arrow.up {
    border-top: none;
    border-bottom: 4px solid #555;
  }
  .intl-tel-input .country-list {
    position: absolute;
    z-index: 2;
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0 0 0 -1px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    border: 1px solid #ccc;
    white-space: nowrap;
    max-height: 200px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .intl-tel-input .country-list.dropup {
    bottom: 100%;
    margin-bottom: -1px;
  }
  .intl-tel-input .country-list .flag-box {
    display: inline-block;
    width: 20px;
  }
  @media (max-width: 500px) {
    .intl-tel-input .country-list {
      white-space: normal;
    }
  }
  .intl-tel-input .country-list .divider {
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #ccc;
  }
  .intl-tel-input .country-list .country {
    padding: 5px 10px;
  }
  .intl-tel-input .country-list .country .dial-code {
    color: #999;
  }
  .intl-tel-input .country-list .country.highlight {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .intl-tel-input .country-list .country-name,
  .intl-tel-input .country-list .dial-code,
  .intl-tel-input .country-list .flag-box {
    vertical-align: middle;
  }
  .intl-tel-input .country-list .country-name,
  .intl-tel-input .country-list .flag-box {
    margin-right: 6px;
  }
  .intl-tel-input.allow-dropdown input,
  .intl-tel-input.allow-dropdown input[type='tel'],
  .intl-tel-input.allow-dropdown input[type='text'] {
    padding-right: 6px;
    padding-left: 52px;
    margin-left: 0;
  }
  .intl-tel-input.allow-dropdown .flag-container {
    right: auto;
    left: 0;
    width: 100%;
  }
  .intl-tel-input.allow-dropdown .selected-flag {
    width: 46px;
  }
  .intl-tel-input.allow-dropdown .flag-container:hover {
    cursor: pointer;
  }
  .intl-tel-input.allow-dropdown .flag-container:hover .selected-flag {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .intl-tel-input.allow-dropdown input[disabled] + .flag-container:hover,
  .intl-tel-input.allow-dropdown input[readonly] + .flag-container:hover {
    cursor: default;
  }
  .intl-tel-input.allow-dropdown
    input[disabled]
    + .flag-container:hover
    .selected-flag,
  .intl-tel-input.allow-dropdown
    input[readonly]
    + .flag-container:hover
    .selected-flag {
    background-color: transparent;
  }
  .intl-tel-input.allow-dropdown.separate-dial-code .selected-flag {
    background-color: rgba(0, 0, 0, 0.05);
    display: table;
  }
  .intl-tel-input.allow-dropdown.separate-dial-code .selected-dial-code {
    display: table-cell;
    vertical-align: middle;
    padding-left: 28px;
  }
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-2 input,
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-2 input[type='tel'],
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-2
    input[type='text'] {
    padding-left: 76px;
  }
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-2 .selected-flag {
    width: 70px;
  }
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-3 input,
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-3 input[type='tel'],
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-3
    input[type='text'] {
    padding-left: 84px;
  }
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-3 .selected-flag {
    width: 78px;
  }
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-4 input,
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-4 input[type='tel'],
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-4
    input[type='text'] {
    padding-left: 92px;
  }
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-4 .selected-flag {
    width: 86px;
  }
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-5 input,
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-5 input[type='tel'],
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-5
    input[type='text'] {
    padding-left: 100px;
  }
  .intl-tel-input.allow-dropdown.separate-dial-code.iti-sdc-5 .selected-flag {
    width: 94px;
  }
  .intl-tel-input.iti-container {
    position: absolute;
    top: -1000px;
    left: -1000px;
    z-index: 1060;
    padding: 1px;
  }
  .intl-tel-input.iti-container:hover {
    cursor: pointer;
  }
  .iti-mobile .intl-tel-input.iti-container {
    top: 30px;
    bottom: 30px;
    left: 30px;
    right: 30px;
    position: fixed;
  }
  .iti-mobile .intl-tel-input .country-list {
    max-height: 100%;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }
  .iti-mobile .intl-tel-input .country-list .country {
    padding: 10px;
    line-height: 1.5em;
  }
  .iti-flag.be {
    width: 18px;
  }
  .iti-flag.ch {
    width: 15px;
  }
  .iti-flag.mc {
    width: 19px;
  }
  .iti-flag.ne {
    width: 18px;
  }
  .iti-flag.np {
    width: 13px;
  }
  .iti-flag.va {
    width: 15px;
  }
  @media only screen and (-o-min-device-pixel-ratio: 2/1),
    only screen and (-webkit-min-device-pixel-ratio: 2),
    only screen and (min--moz-device-pixel-ratio: 2),
    only screen and (min-device-pixel-ratio: 2),
    only screen and (min-resolution: 2dppx),
    only screen and (min-resolution: 192dpi) {
    .iti-flag {
      background-size: 5630px 15px;
    }
  }
  .iti-flag.ac {
    height: 10px;
    background-position: 0 0;
  }
  .iti-flag.ad {
    height: 14px;
    background-position: -22px 0;
  }
  .iti-flag.ae {
    height: 10px;
    background-position: -44px 0;
  }
  .iti-flag.af {
    height: 14px;
    background-position: -66px 0;
  }
  .iti-flag.ag {
    height: 14px;
    background-position: -88px 0;
  }
  .iti-flag.ai {
    height: 10px;
    background-position: -110px 0;
  }
  .iti-flag.al {
    height: 15px;
    background-position: -132px 0;
  }
  .iti-flag.am {
    height: 10px;
    background-position: -154px 0;
  }
  .iti-flag.ao {
    height: 14px;
    background-position: -176px 0;
  }
  .iti-flag.aq {
    height: 14px;
    background-position: -198px 0;
  }
  .iti-flag.ar {
    height: 13px;
    background-position: -220px 0;
  }
  .iti-flag.as {
    height: 10px;
    background-position: -242px 0;
  }
  .iti-flag.at {
    height: 14px;
    background-position: -264px 0;
  }
  .iti-flag.au {
    height: 10px;
    background-position: -286px 0;
  }
  .iti-flag.aw {
    height: 14px;
    background-position: -308px 0;
  }
  .iti-flag.ax {
    height: 13px;
    background-position: -330px 0;
  }
  .iti-flag.az {
    height: 10px;
    background-position: -352px 0;
  }
  .iti-flag.ba {
    height: 10px;
    background-position: -374px 0;
  }
  .iti-flag.bb {
    height: 14px;
    background-position: -396px 0;
  }
  .iti-flag.bd {
    height: 12px;
    background-position: -418px 0;
  }
  .iti-flag.be {
    height: 15px;
    background-position: -440px 0;
  }
  .iti-flag.bf {
    height: 14px;
    background-position: -460px 0;
  }
  .iti-flag.bg {
    height: 12px;
    background-position: -482px 0;
  }
  .iti-flag.bh {
    height: 12px;
    background-position: -504px 0;
  }
  .iti-flag.bi {
    height: 12px;
    background-position: -526px 0;
  }
  .iti-flag.bj {
    height: 14px;
    background-position: -548px 0;
  }
  .iti-flag.bl {
    height: 14px;
    background-position: -570px 0;
  }
  .iti-flag.bm {
    height: 10px;
    background-position: -592px 0;
  }
  .iti-flag.bn {
    height: 10px;
    background-position: -614px 0;
  }
  .iti-flag.bo {
    height: 14px;
    background-position: -636px 0;
  }
  .iti-flag.bq {
    height: 14px;
    background-position: -658px 0;
  }
  .iti-flag.br {
    height: 14px;
    background-position: -680px 0;
  }
  .iti-flag.bs {
    height: 10px;
    background-position: -702px 0;
  }
  .iti-flag.bt {
    height: 14px;
    background-position: -724px 0;
  }
  .iti-flag.bv {
    height: 15px;
    background-position: -746px 0;
  }
  .iti-flag.bw {
    height: 14px;
    background-position: -768px 0;
  }
  .iti-flag.by {
    height: 10px;
    background-position: -790px 0;
  }
  .iti-flag.bz {
    height: 14px;
    background-position: -812px 0;
  }
  .iti-flag.ca {
    height: 10px;
    background-position: -834px 0;
  }
  .iti-flag.cc {
    height: 10px;
    background-position: -856px 0;
  }
  .iti-flag.cd {
    height: 15px;
    background-position: -878px 0;
  }
  .iti-flag.cf {
    height: 14px;
    background-position: -900px 0;
  }
  .iti-flag.cg {
    height: 14px;
    background-position: -922px 0;
  }
  .iti-flag.ch {
    height: 15px;
    background-position: -944px 0;
  }
  .iti-flag.ci {
    height: 14px;
    background-position: -961px 0;
  }
  .iti-flag.ck {
    height: 10px;
    background-position: -983px 0;
  }
  .iti-flag.cl {
    height: 14px;
    background-position: -1005px 0;
  }
  .iti-flag.cm {
    height: 14px;
    background-position: -1027px 0;
  }
  .iti-flag.cn {
    height: 14px;
    background-position: -1049px 0;
  }
  .iti-flag.co {
    height: 14px;
    background-position: -1071px 0;
  }
  .iti-flag.cp {
    height: 14px;
    background-position: -1093px 0;
  }
  .iti-flag.cr {
    height: 12px;
    background-position: -1115px 0;
  }
  .iti-flag.cu {
    height: 10px;
    background-position: -1137px 0;
  }
  .iti-flag.cv {
    height: 12px;
    background-position: -1159px 0;
  }
  .iti-flag.cw {
    height: 14px;
    background-position: -1181px 0;
  }
  .iti-flag.cx {
    height: 10px;
    background-position: -1203px 0;
  }
  .iti-flag.cy {
    height: 14px;
    background-position: -1225px 0;
  }
  .iti-flag.cz {
    height: 14px;
    background-position: -1247px 0;
  }
  .iti-flag.de {
    height: 12px;
    background-position: -1269px 0;
  }
  .iti-flag.dg {
    height: 10px;
    background-position: -1291px 0;
  }
  .iti-flag.dj {
    height: 14px;
    background-position: -1313px 0;
  }
  .iti-flag.dk {
    height: 15px;
    background-position: -1335px 0;
  }
  .iti-flag.dm {
    height: 10px;
    background-position: -1357px 0;
  }
  .iti-flag.do {
    height: 13px;
    background-position: -1379px 0;
  }
  .iti-flag.dz {
    height: 14px;
    background-position: -1401px 0;
  }
  .iti-flag.ea {
    height: 14px;
    background-position: -1423px 0;
  }
  .iti-flag.ec {
    height: 14px;
    background-position: -1445px 0;
  }
  .iti-flag.ee {
    height: 13px;
    background-position: -1467px 0;
  }
  .iti-flag.eg {
    height: 14px;
    background-position: -1489px 0;
  }
  .iti-flag.eh {
    height: 10px;
    background-position: -1511px 0;
  }
  .iti-flag.er {
    height: 10px;
    background-position: -1533px 0;
  }
  .iti-flag.es {
    height: 14px;
    background-position: -1555px 0;
  }
  .iti-flag.et {
    height: 10px;
    background-position: -1577px 0;
  }
  .iti-flag.eu {
    height: 14px;
    background-position: -1599px 0;
  }
  .iti-flag.fi {
    height: 12px;
    background-position: -1621px 0;
  }
  .iti-flag.fj {
    height: 10px;
    background-position: -1643px 0;
  }
  .iti-flag.fk {
    height: 10px;
    background-position: -1665px 0;
  }
  .iti-flag.fm {
    height: 11px;
    background-position: -1687px 0;
  }
  .iti-flag.fo {
    height: 15px;
    background-position: -1709px 0;
  }
  .iti-flag.fr {
    height: 14px;
    background-position: -1731px 0;
  }
  .iti-flag.ga {
    height: 15px;
    background-position: -1753px 0;
  }
  .iti-flag.gb {
    height: 10px;
    background-position: -1775px 0;
  }
  .iti-flag.gd {
    height: 12px;
    background-position: -1797px 0;
  }
  .iti-flag.ge {
    height: 14px;
    background-position: -1819px 0;
  }
  .iti-flag.gf {
    height: 14px;
    background-position: -1841px 0;
  }
  .iti-flag.gg {
    height: 14px;
    background-position: -1863px 0;
  }
  .iti-flag.gh {
    height: 14px;
    background-position: -1885px 0;
  }
  .iti-flag.gi {
    height: 10px;
    background-position: -1907px 0;
  }
  .iti-flag.gl {
    height: 14px;
    background-position: -1929px 0;
  }
  .iti-flag.gm {
    height: 14px;
    background-position: -1951px 0;
  }
  .iti-flag.gn {
    height: 14px;
    background-position: -1973px 0;
  }
  .iti-flag.gp {
    height: 14px;
    background-position: -1995px 0;
  }
  .iti-flag.gq {
    height: 14px;
    background-position: -2017px 0;
  }
  .iti-flag.gr {
    height: 14px;
    background-position: -2039px 0;
  }
  .iti-flag.gs {
    height: 10px;
    background-position: -2061px 0;
  }
  .iti-flag.gt {
    height: 13px;
    background-position: -2083px 0;
  }
  .iti-flag.gu {
    height: 11px;
    background-position: -2105px 0;
  }
  .iti-flag.gw {
    height: 10px;
    background-position: -2127px 0;
  }
  .iti-flag.gy {
    height: 12px;
    background-position: -2149px 0;
  }
  .iti-flag.hk {
    height: 14px;
    background-position: -2171px 0;
  }
  .iti-flag.hm {
    height: 10px;
    background-position: -2193px 0;
  }
  .iti-flag.hn {
    height: 10px;
    background-position: -2215px 0;
  }
  .iti-flag.hr {
    height: 10px;
    background-position: -2237px 0;
  }
  .iti-flag.ht {
    height: 12px;
    background-position: -2259px 0;
  }
  .iti-flag.hu {
    height: 10px;
    background-position: -2281px 0;
  }
  .iti-flag.ic {
    height: 14px;
    background-position: -2303px 0;
  }
  .iti-flag.id {
    height: 14px;
    background-position: -2325px 0;
  }
  .iti-flag.ie {
    height: 10px;
    background-position: -2347px 0;
  }
  .iti-flag.il {
    height: 15px;
    background-position: -2369px 0;
  }
  .iti-flag.im {
    height: 10px;
    background-position: -2391px 0;
  }
  .iti-flag.in {
    height: 14px;
    background-position: -2413px 0;
  }
  .iti-flag.io {
    height: 10px;
    background-position: -2435px 0;
  }
  .iti-flag.iq {
    height: 14px;
    background-position: -2457px 0;
  }
  .iti-flag.ir {
    height: 12px;
    background-position: -2479px 0;
  }
  .iti-flag.is {
    height: 15px;
    background-position: -2501px 0;
  }
  .iti-flag.it {
    height: 14px;
    background-position: -2523px 0;
  }
  .iti-flag.je {
    height: 12px;
    background-position: -2545px 0;
  }
  .iti-flag.jm {
    height: 10px;
    background-position: -2567px 0;
  }
  .iti-flag.jo {
    height: 10px;
    background-position: -2589px 0;
  }
  .iti-flag.jp {
    height: 14px;
    background-position: -2611px 0;
  }
  .iti-flag.ke {
    height: 14px;
    background-position: -2633px 0;
  }
  .iti-flag.kg {
    height: 12px;
    background-position: -2655px 0;
  }
  .iti-flag.kh {
    height: 13px;
    background-position: -2677px 0;
  }
  .iti-flag.ki {
    height: 10px;
    background-position: -2699px 0;
  }
  .iti-flag.km {
    height: 12px;
    background-position: -2721px 0;
  }
  .iti-flag.kn {
    height: 14px;
    background-position: -2743px 0;
  }
  .iti-flag.kp {
    height: 10px;
    background-position: -2765px 0;
  }
  .iti-flag.kr {
    height: 14px;
    background-position: -2787px 0;
  }
  .iti-flag.kw {
    height: 10px;
    background-position: -2809px 0;
  }
  .iti-flag.ky {
    height: 10px;
    background-position: -2831px 0;
  }
  .iti-flag.kz {
    height: 10px;
    background-position: -2853px 0;
  }
  .iti-flag.la {
    height: 14px;
    background-position: -2875px 0;
  }
  .iti-flag.lb {
    height: 14px;
    background-position: -2897px 0;
  }
  .iti-flag.lc {
    height: 10px;
    background-position: -2919px 0;
  }
  .iti-flag.li {
    height: 12px;
    background-position: -2941px 0;
  }
  .iti-flag.lk {
    height: 10px;
    background-position: -2963px 0;
  }
  .iti-flag.lr {
    height: 11px;
    background-position: -2985px 0;
  }
  .iti-flag.ls {
    height: 14px;
    background-position: -3007px 0;
  }
  .iti-flag.lt {
    height: 12px;
    background-position: -3029px 0;
  }
  .iti-flag.lu {
    height: 12px;
    background-position: -3051px 0;
  }
  .iti-flag.lv {
    height: 10px;
    background-position: -3073px 0;
  }
  .iti-flag.ly {
    height: 10px;
    background-position: -3095px 0;
  }
  .iti-flag.ma {
    height: 14px;
    background-position: -3117px 0;
  }
  .iti-flag.mc {
    height: 15px;
    background-position: -3139px 0;
  }
  .iti-flag.md {
    height: 10px;
    background-position: -3160px 0;
  }
  .iti-flag.me {
    height: 10px;
    background-position: -3182px 0;
  }
  .iti-flag.mf {
    height: 14px;
    background-position: -3204px 0;
  }
  .iti-flag.mg {
    height: 14px;
    background-position: -3226px 0;
  }
  .iti-flag.mh {
    height: 11px;
    background-position: -3248px 0;
  }
  .iti-flag.mk {
    height: 10px;
    background-position: -3270px 0;
  }
  .iti-flag.ml {
    height: 14px;
    background-position: -3292px 0;
  }
  .iti-flag.mm {
    height: 14px;
    background-position: -3314px 0;
  }
  .iti-flag.mn {
    height: 10px;
    background-position: -3336px 0;
  }
  .iti-flag.mo {
    height: 14px;
    background-position: -3358px 0;
  }
  .iti-flag.mp {
    height: 10px;
    background-position: -3380px 0;
  }
  .iti-flag.mq {
    height: 14px;
    background-position: -3402px 0;
  }
  .iti-flag.mr {
    height: 14px;
    background-position: -3424px 0;
  }
  .iti-flag.ms {
    height: 10px;
    background-position: -3446px 0;
  }
  .iti-flag.mt {
    height: 14px;
    background-position: -3468px 0;
  }
  .iti-flag.mu {
    height: 14px;
    background-position: -3490px 0;
  }
  .iti-flag.mv {
    height: 14px;
    background-position: -3512px 0;
  }
  .iti-flag.mw {
    height: 14px;
    background-position: -3534px 0;
  }
  .iti-flag.mx {
    height: 12px;
    background-position: -3556px 0;
  }
  .iti-flag.my {
    height: 10px;
    background-position: -3578px 0;
  }
  .iti-flag.mz {
    height: 14px;
    background-position: -3600px 0;
  }
  .iti-flag.na {
    height: 14px;
    background-position: -3622px 0;
  }
  .iti-flag.nc {
    height: 10px;
    background-position: -3644px 0;
  }
  .iti-flag.ne {
    height: 15px;
    background-position: -3666px 0;
  }
  .iti-flag.nf {
    height: 10px;
    background-position: -3686px 0;
  }
  .iti-flag.ng {
    height: 10px;
    background-position: -3708px 0;
  }
  .iti-flag.ni {
    height: 12px;
    background-position: -3730px 0;
  }
  .iti-flag.nl {
    height: 14px;
    background-position: -3752px 0;
  }
  .iti-flag.no {
    height: 15px;
    background-position: -3774px 0;
  }
  .iti-flag.np {
    height: 15px;
    background-position: -3796px 0;
  }
  .iti-flag.nr {
    height: 10px;
    background-position: -3811px 0;
  }
  .iti-flag.nu {
    height: 10px;
    background-position: -3833px 0;
  }
  .iti-flag.nz {
    height: 10px;
    background-position: -3855px 0;
  }
  .iti-flag.om {
    height: 10px;
    background-position: -3877px 0;
  }
  .iti-flag.pa {
    height: 14px;
    background-position: -3899px 0;
  }
  .iti-flag.pe {
    height: 14px;
    background-position: -3921px 0;
  }
  .iti-flag.pf {
    height: 14px;
    background-position: -3943px 0;
  }
  .iti-flag.pg {
    height: 15px;
    background-position: -3965px 0;
  }
  .iti-flag.ph {
    height: 10px;
    background-position: -3987px 0;
  }
  .iti-flag.pk {
    height: 14px;
    background-position: -4009px 0;
  }
  .iti-flag.pl {
    height: 13px;
    background-position: -4031px 0;
  }
  .iti-flag.pm {
    height: 14px;
    background-position: -4053px 0;
  }
  .iti-flag.pn {
    height: 10px;
    background-position: -4075px 0;
  }
  .iti-flag.pr {
    height: 14px;
    background-position: -4097px 0;
  }
  .iti-flag.ps {
    height: 10px;
    background-position: -4119px 0;
  }
  .iti-flag.pt {
    height: 14px;
    background-position: -4141px 0;
  }
  .iti-flag.pw {
    height: 13px;
    background-position: -4163px 0;
  }
  .iti-flag.py {
    height: 11px;
    background-position: -4185px 0;
  }
  .iti-flag.qa {
    height: 8px;
    background-position: -4207px 0;
  }
  .iti-flag.re {
    height: 14px;
    background-position: -4229px 0;
  }
  .iti-flag.ro {
    height: 14px;
    background-position: -4251px 0;
  }
  .iti-flag.rs {
    height: 14px;
    background-position: -4273px 0;
  }
  .iti-flag.ru {
    height: 14px;
    background-position: -4295px 0;
  }
  .iti-flag.rw {
    height: 14px;
    background-position: -4317px 0;
  }
  .iti-flag.sa {
    height: 14px;
    background-position: -4339px 0;
  }
  .iti-flag.sb {
    height: 10px;
    background-position: -4361px 0;
  }
  .iti-flag.sc {
    height: 10px;
    background-position: -4383px 0;
  }
  .iti-flag.sd {
    height: 10px;
    background-position: -4405px 0;
  }
  .iti-flag.se {
    height: 13px;
    background-position: -4427px 0;
  }
  .iti-flag.sg {
    height: 14px;
    background-position: -4449px 0;
  }
  .iti-flag.sh {
    height: 10px;
    background-position: -4471px 0;
  }
  .iti-flag.si {
    height: 10px;
    background-position: -4493px 0;
  }
  .iti-flag.sj {
    height: 15px;
    background-position: -4515px 0;
  }
  .iti-flag.sk {
    height: 14px;
    background-position: -4537px 0;
  }
  .iti-flag.sl {
    height: 14px;
    background-position: -4559px 0;
  }
  .iti-flag.sm {
    height: 15px;
    background-position: -4581px 0;
  }
  .iti-flag.sn {
    height: 14px;
    background-position: -4603px 0;
  }
  .iti-flag.so {
    height: 14px;
    background-position: -4625px 0;
  }
  .iti-flag.sr {
    height: 14px;
    background-position: -4647px 0;
  }
  .iti-flag.ss {
    height: 10px;
    background-position: -4669px 0;
  }
  .iti-flag.st {
    height: 10px;
    background-position: -4691px 0;
  }
  .iti-flag.sv {
    height: 12px;
    background-position: -4713px 0;
  }
  .iti-flag.sx {
    height: 14px;
    background-position: -4735px 0;
  }
  .iti-flag.sy {
    height: 14px;
    background-position: -4757px 0;
  }
  .iti-flag.sz {
    height: 14px;
    background-position: -4779px 0;
  }
  .iti-flag.ta {
    height: 10px;
    background-position: -4801px 0;
  }
  .iti-flag.tc {
    height: 10px;
    background-position: -4823px 0;
  }
  .iti-flag.td {
    height: 14px;
    background-position: -4845px 0;
  }
  .iti-flag.tf {
    height: 14px;
    background-position: -4867px 0;
  }
  .iti-flag.tg {
    height: 13px;
    background-position: -4889px 0;
  }
  .iti-flag.th {
    height: 14px;
    background-position: -4911px 0;
  }
  .iti-flag.tj {
    height: 10px;
    background-position: -4933px 0;
  }
  .iti-flag.tk {
    height: 10px;
    background-position: -4955px 0;
  }
  .iti-flag.tl {
    height: 10px;
    background-position: -4977px 0;
  }
  .iti-flag.tm {
    height: 14px;
    background-position: -4999px 0;
  }
  .iti-flag.tn {
    height: 14px;
    background-position: -5021px 0;
  }
  .iti-flag.to {
    height: 10px;
    background-position: -5043px 0;
  }
  .iti-flag.tr {
    height: 14px;
    background-position: -5065px 0;
  }
  .iti-flag.tt {
    height: 12px;
    background-position: -5087px 0;
  }
  .iti-flag.tv {
    height: 10px;
    background-position: -5109px 0;
  }
  .iti-flag.tw {
    height: 14px;
    background-position: -5131px 0;
  }
  .iti-flag.tz {
    height: 14px;
    background-position: -5153px 0;
  }
  .iti-flag.ua {
    height: 14px;
    background-position: -5175px 0;
  }
  .iti-flag.ug {
    height: 14px;
    background-position: -5197px 0;
  }
  .iti-flag.um {
    height: 11px;
    background-position: -5219px 0;
  }
  .iti-flag.us {
    height: 11px;
    background-position: -5241px 0;
  }
  .iti-flag.uy {
    height: 14px;
    background-position: -5263px 0;
  }
  .iti-flag.uz {
    height: 10px;
    background-position: -5285px 0;
  }
  .iti-flag.va {
    height: 15px;
    background-position: -5307px 0;
  }
  .iti-flag.vc {
    height: 14px;
    background-position: -5324px 0;
  }
  .iti-flag.ve {
    height: 14px;
    background-position: -5346px 0;
  }
  .iti-flag.vg {
    height: 10px;
    background-position: -5368px 0;
  }
  .iti-flag.vi {
    height: 14px;
    background-position: -5390px 0;
  }
  .iti-flag.vn {
    height: 14px;
    background-position: -5412px 0;
  }
  .iti-flag.vu {
    height: 12px;
    background-position: -5434px 0;
  }
  .iti-flag.wf {
    height: 14px;
    background-position: -5456px 0;
  }
  .iti-flag.ws {
    height: 10px;
    background-position: -5478px 0;
  }
  .iti-flag.xk {
    height: 15px;
    background-position: -5500px 0;
  }
  .iti-flag.ye {
    height: 14px;
    background-position: -5522px 0;
  }
  .iti-flag.yt {
    height: 14px;
    background-position: -5544px 0;
  }
  .iti-flag.za {
    height: 14px;
    background-position: -5566px 0;
  }
  .iti-flag.zm {
    height: 14px;
    background-position: -5588px 0;
  }
  .iti-flag.zw {
    height: 10px;
    background-position: -5610px 0;
  }
  .iti-flag {
    width: 20px;
    height: 15px;
    box-shadow: 0 0 1px 0 #888;
    background-image: ${flags};
    background-repeat: no-repeat;
    background-color: #dbdbdb;
    background-position: 20px 0;
  }
  @media only screen and (-o-min-device-pixel-ratio: 2/1),
    only screen and (-webkit-min-device-pixel-ratio: 2),
    only screen and (min--moz-device-pixel-ratio: 2),
    only screen and (min-device-pixel-ratio: 2),
    only screen and (min-resolution: 2dppx),
    only screen and (min-resolution: 192dpi) {
    .iti-flag {
      background-image: ${flags2};
    }
  }
  .iti-flag.np {
    background-color: transparent;
  }
`;

const StyledTelInput = styled.div`
  display: inline-flex;

  ${dropdownStyles}

  input {
    ${inputStyles}
  }
`;

export default StyledTelInput;
