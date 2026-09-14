# GraphQL input and output types

| Type | Input | Output |
|---|:---:|:---:|
| Scalars (`Int`, `Float`, `String`, `Boolean`, `ID`) | ✅ | ✅ |
| Custom scalars (`Date`, etc.) | ✅ | ✅ |
| Enums (`enum`) | ✅ | ✅ |
| Input objects (`input`) | ✅ | ❌ |
| Objects (`type`) | ❌ | ✅ |
| Interfaces (`interface`) | ❌ | ✅ |
| Unions (`union`) | ❌ | ✅ |

**Lists `[]` and non-null `!`** can wrap types in either column, provided the wrapped type is allowed there.

**Input** = arguments, variables, input-object fields.

**Output** = values returned by fields.
