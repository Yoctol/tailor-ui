<a name="1.10.3"></a>

## [1.10.3](https://github.com/yoctol/ui/compare/v1.10.2...v1.10.3) (2018-08-21)

<a name="1.10.2"></a>

## [1.10.2](https://github.com/yoctol/ui/compare/v1.10.1...v1.10.2) (2018-08-20)

### Bug Fixes

- **textfield:** actived condition ([#279](https://github.com/yoctol/ui/issues/279)) ([46a4ff9](https://github.com/yoctol/ui/commit/46a4ff9))

<a name="1.10.1"></a>

## [1.10.1](https://github.com/yoctol/ui/compare/v1.10.0...v1.10.1) (2018-08-20)

### Bug Fixes

- **textfield:** controlled max length ([79c55d6](https://github.com/yoctol/ui/commit/79c55d6))

### Features

- **modal:** add confirmButtonProps & cancelButtonProps ([f17bc32](https://github.com/yoctol/ui/commit/f17bc32))
- **modal:** add empty footer ([679f9cc](https://github.com/yoctol/ui/commit/679f9cc))
- **popover:** add hide popover to title props ([e507616](https://github.com/yoctol/ui/commit/e507616))
- **tooltip:** add defaultVisible ([f085c67](https://github.com/yoctol/ui/commit/f085c67))

<a name="1.10.0"></a>

# [1.10.0](https://github.com/yoctol/ui/compare/1.10.0...v1.10.0) (2018-08-14)

### Bug Fixes

- **button:** button default is light color ([fe6634e](https://github.com/yoctol/ui/commit/fe6634e))
- **modal:** confirm events ([3e7097e](https://github.com/yoctol/ui/commit/3e7097e))

### Code Refactoring

- **button:** remove variant props ([51a2da3](https://github.com/yoctol/ui/commit/51a2da3))

### BREAKING CHANGES

- **button:** use bool props instead of variant props
- **button:** the button default color is light (previous is primary)

<a name="1.9.0"></a>

# [1.9.0](https://github.com/yoctol/ui/compare/v1.8.2...v1.9.0) (2018-08-14)

### Bug Fixes

- **checkbox:** checkbox group onChange event ([6f04083](https://github.com/yoctol/ui/commit/6f04083))

### Code Refactoring

- **button:** add type & variant ([de8d462](https://github.com/yoctol/ui/commit/de8d462)), closes [#270](https://github.com/yoctol/ui/issues/270)
- **card:** drop useless api ([05684ac](https://github.com/yoctol/ui/commit/05684ac))
- **modal:** remove no animation modal & rename api ([cf016ea](https://github.com/yoctol/ui/commit/cf016ea))

### Features

- **dropdown:** update styles ([#264](https://github.com/yoctol/ui/issues/264)) ([c8dad0e](https://github.com/yoctol/ui/commit/c8dad0e))
- **modal:** add header & footer ([73e797d](https://github.com/yoctol/ui/commit/73e797d))
- **modal:** implement instance method ([5c54632](https://github.com/yoctol/ui/commit/5c54632))
- **utils:** add size to get-type-icon ([c178282](https://github.com/yoctol/ui/commit/c178282))

### BREAKING CHANGES

- **button:** move all type & variant to new props
- **modal:** renamed `show` to `visible`, renamed `closeButton` to `closable`, remove
  `animation`
- **card:** REMOVE Card.Button from Card component

<a name="1.8.2"></a>

## [1.8.2](https://github.com/yoctol/ui/compare/v1.8.1...v1.8.2) (2018-08-09)

### Bug Fixes

- **tooltip:** wrapper z-index ([#260](https://github.com/yoctol/ui/issues/260)) ([a08829c](https://github.com/yoctol/ui/commit/a08829c))

<a name="1.8.1"></a>

## [1.8.1](https://github.com/yoctol/ui/compare/v1.8.0...v1.8.1) (2018-08-08)

### Bug Fixes

- **popover:** update opacity to 1 ([#255](https://github.com/yoctol/ui/issues/255)) ([0d6c1b8](https://github.com/yoctol/ui/commit/0d6c1b8))

<a name="1.8.0"></a>

# [1.8.0](https://github.com/yoctol/ui/compare/v1.7.0...v1.8.0) (2018-08-06)

### Bug Fixes

- **checkbox:** controlled props `value` should work ([1b161b9](https://github.com/yoctol/ui/commit/1b161b9))
- **checkbox:** set initialValues as `[]` ([33c67c3](https://github.com/yoctol/ui/commit/33c67c3))
- **radio:** controlled props `value` should work ([9128de3](https://github.com/yoctol/ui/commit/9128de3))
- **tooltip:** move hideTooltip to context ([7c4a511](https://github.com/yoctol/ui/commit/7c4a511))

### Features

- make checkbox & radio field optional ([5ff6c05](https://github.com/yoctol/ui/commit/5ff6c05))
- **popconfirm:** implement popconfirm ([9085889](https://github.com/yoctol/ui/commit/9085889))
- **popover:** Implement popover ([#251](https://github.com/yoctol/ui/issues/251)) ([1580492](https://github.com/yoctol/ui/commit/1580492))
- **tooltip:** add scale animation ([3df98f9](https://github.com/yoctol/ui/commit/3df98f9))

<a name="1.7.0"></a>

# [1.7.0](https://github.com/yoctol/ui/compare/v1.6.2...v1.7.0) (2018-08-03)

### Features

- **tooltip:** Add hide callback to content props ([f0cecf1](https://github.com/yoctol/ui/commit/f0cecf1))
- **tooltip:** Add onVisibleChange ([8574ec2](https://github.com/yoctol/ui/commit/8574ec2))
- **tooltip:** close tooltip after click outside ([e653e7f](https://github.com/yoctol/ui/commit/e653e7f))

<a name="1.6.2"></a>

## [1.6.2](https://github.com/yoctol/ui/compare/v1.6.1...v1.6.2) (2018-07-30)

<a name="1.6.1"></a>

## [1.6.1](https://github.com/yoctol/ui/compare/v1.6.0...v1.6.1) (2018-07-30)

<a name="1.6.0"></a>

# [1.6.0](https://github.com/yoctol/ui/compare/v1.5.2...v1.6.0) (2018-07-30)

<a name="1.5.2"></a>

## [1.5.2](https://github.com/yoctol/ui/compare/v1.5.1...v1.5.2) (2018-07-26)

<a name="1.5.1"></a>

## [1.5.1](https://github.com/yoctol/ui/compare/v1.5.0...v1.5.1) (2018-07-25)

<a name="1.5.0"></a>

# [1.5.0](https://github.com/yoctol/ui/compare/v1.4.0...v1.5.0) (2018-07-25)

<a name="1.4.0"></a>

# [1.4.0](https://github.com/yoctol/ui/compare/v1.3.4...v1.4.0) (2018-07-17)

<a name="1.3.4"></a>

## [1.3.4](https://github.com/yoctol/ui/compare/v1.3.3...v1.3.4) (2018-07-17)

<a name="1.3.3"></a>

## [1.3.3](https://github.com/yoctol/ui/compare/v1.3.2...v1.3.3) (2018-07-17)

<a name="1.3.2"></a>

## [1.3.2](https://github.com/yoctol/ui/compare/v1.3.1...v1.3.2) (2018-07-13)

<a name="1.3.1"></a>

## [1.3.1](https://github.com/yoctol/ui/compare/v1.3.0...v1.3.1) (2018-07-10)

<a name="1.3.0"></a>

# [1.3.0](https://github.com/yoctol/ui/compare/v1.2.6...v1.3.0) (2018-07-10)

<a name="1.2.6"></a>

## [1.2.6](https://github.com/yoctol/ui/compare/v1.2.5...v1.2.6) (2018-07-03)

<a name="1.2.5"></a>

## [1.2.5](https://github.com/yoctol/ui/compare/v1.2.4...v1.2.5) (2018-07-02)

<a name="1.2.4"></a>

## [1.2.4](https://github.com/yoctol/ui/compare/v1.2.3...v1.2.4) (2018-06-22)

<a name="1.2.3"></a>

## [1.2.3](https://github.com/yoctol/ui/compare/v1.2.2...v1.2.3) (2018-06-15)

<a name="1.2.2"></a>

## [1.2.2](https://github.com/yoctol/ui/compare/v1.2.1...v1.2.2) (2018-06-15)

<a name="1.2.1"></a>

## [1.2.1](https://github.com/yoctol/ui/compare/v1.2.0...v1.2.1) (2018-06-14)

<a name="1.2.0"></a>

# [1.2.0](https://github.com/yoctol/ui/compare/v1.1.4...v1.2.0) (2018-06-14)

<a name="1.1.4"></a>

## [1.1.4](https://github.com/yoctol/ui/compare/v1.1.3...v1.1.4) (2018-06-11)

<a name="1.1.3"></a>

## [1.1.3](https://github.com/yoctol/ui/compare/v1.1.2...v1.1.3) (2018-06-11)

<a name="1.1.2"></a>

## [1.1.2](https://github.com/yoctol/ui/compare/v1.1.1...v1.1.2) (2018-06-07)

<a name="1.1.1"></a>

## [1.1.1](https://github.com/yoctol/ui/compare/v1.1.0...v1.1.1) (2018-06-06)

<a name="1.1.0"></a>

# [1.1.0](https://github.com/yoctol/ui/compare/v1.0.1...v1.1.0) (2018-06-06)

<a name="1.0.1"></a>

## [1.0.1](https://github.com/yoctol/ui/compare/v1.0.0...v1.0.1) (2018-05-31)

<a name="1.0.0"></a>

# [1.0.0](https://github.com/yoctol/ui/compare/v0.7.1...v1.0.0) (2018-05-31)

<a name="0.7.1"></a>

## [0.7.1](https://github.com/yoctol/ui/compare/v0.7.0...v0.7.1) (2018-05-30)

<a name="0.7.0"></a>

# [0.7.0](https://github.com/yoctol/ui/compare/v0.6.4...v0.7.0) (2018-05-30)

<a name="0.6.4"></a>

## [0.6.4](https://github.com/yoctol/ui/compare/v0.6.3...v0.6.4) (2018-05-28)

<a name="0.6.3"></a>

## [0.6.3](https://github.com/yoctol/ui/compare/v0.6.2...v0.6.3) (2018-05-24)

<a name="0.6.2"></a>

## [0.6.2](https://github.com/yoctol/ui/compare/v0.6.1...v0.6.2) (2018-05-24)

<a name="0.6.1"></a>

## [0.6.1](https://github.com/yoctol/ui/compare/v0.6.0...v0.6.1) (2018-05-23)

<a name="0.6.0"></a>

# [0.6.0](https://github.com/yoctol/ui/compare/v0.5.1...v0.6.0) (2018-05-22)

<a name="0.5.1"></a>

## [0.5.1](https://github.com/yoctol/ui/compare/v0.5.0...v0.5.1) (2018-05-18)

<a name="0.5.0"></a>

# [0.5.0](https://github.com/yoctol/ui/compare/v0.4.0...v0.5.0) (2018-05-17)

<a name="0.4.0"></a>

# [0.4.0](https://github.com/yoctol/ui/compare/v0.3.2...v0.4.0) (2018-05-16)

<a name="0.3.2"></a>

## [0.3.2](https://github.com/yoctol/ui/compare/v0.3.1...v0.3.2) (2018-05-15)

<a name="0.3.1"></a>

## [0.3.1](https://github.com/yoctol/ui/compare/v0.3.0...v0.3.1) (2018-05-15)

<a name="0.3.0"></a>

# [0.3.0](https://github.com/yoctol/ui/compare/v0.2.0...v0.3.0) (2018-05-15)

<a name="0.2.0"></a>

# [0.2.0](https://github.com/yoctol/ui/compare/v0.1.3...v0.2.0) (2018-05-14)

<a name="0.1.3"></a>

## [0.1.3](https://github.com/yoctol/ui/compare/v0.1.2...v0.1.3) (2018-05-11)

<a name="0.1.2"></a>

## [0.1.2](https://github.com/yoctol/ui/compare/v0.1.1...v0.1.2) (2018-05-10)

<a name="0.1.1"></a>

## [0.1.1](https://github.com/yoctol/ui/compare/v0.1.0...v0.1.1) (2018-05-10)

<a name="0.1.0"></a>

# 0.1.0 (2018-05-10)
