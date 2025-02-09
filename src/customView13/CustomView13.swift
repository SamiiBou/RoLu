//
//  CustomView13.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView13: View {
    @State public var text14Text: String = "Jobs by Category"
    @State public var image12Path: String = "image12_1213718"
    @State public var text15Text: String = "Moving"
    @State public var text16Text: String = "32 Jobs"
    @State public var image13Path: String = "image13_1213724"
    @State public var image14Path: String = "image14_1213725"
    @State public var text17Text: String = "Moving"
    @State public var image15Path: String = "image15_1213728"
    @State public var text18Text: String = "Tutor"
    @State public var text19Text: String = "23 Jobs"
    @State public var image16Path: String = "image16_1213735"
    @State public var text20Text: String = "Tutor"
    @State public var image17Path: String = "image17_1213738"
    @State public var text21Text: String = "Pets"
    @State public var text22Text: String = "12 Jobs"
    @State public var text23Text: String = "Pets"
    @State public var image18Path: String = "image18_1213745"
    @State public var text24Text: String = "All"
    @State public var text25Text: String = "Moving"
    @State public var text26Text: String = "Childcare"
    @State public var text27Text: String = "Security"
    @State public var text28Text: String = "Plumber\n"
    @State public var text29Text: String = "Pets"
    @State public var text30Text: String = "Tutor"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Text(text14Text)
                .foregroundColor(Color(red: 0.19, green: 0.19, blue: 0.19, opacity: 1.00))
                .font(.custom("SFUIText-Bold", size: 20))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
            CustomView14(
                image12Path: image12Path,
                text15Text: text15Text,
                text16Text: text16Text,
                image13Path: image13Path,
                image14Path: image14Path,
                text17Text: text17Text)
                .frame(width: 131.108, height: 183.116)
                .offset(y: 68.884)
            CustomView16(
                image15Path: image15Path,
                text18Text: text18Text,
                text19Text: text19Text,
                image16Path: image16Path,
                text20Text: text20Text)
                .frame(width: 131.108, height: 183.116)
                .offset(x: 297.892, y: 68.884)
            CustomView18(
                image17Path: image17Path,
                text21Text: text21Text,
                text22Text: text22Text,
                text23Text: text23Text,
                image18Path: image18Path)
                .frame(width: 131.108, height: 183.116)
                .offset(x: 148.946, y: 68.884)
            CustomView20(
                text24Text: text24Text,
                text25Text: text25Text,
                text26Text: text26Text,
                text27Text: text27Text,
                text28Text: text28Text,
                text29Text: text29Text,
                text30Text: text30Text)
                .frame(width: 354.081, height: 29.78)
                .offset(y: 34.941)
        }
        .frame(width: 429, height: 252, alignment: .topLeading)
        .clipped()
    }
}

struct CustomView13_Previews: PreviewProvider {
    static var previews: some View {
        CustomView13()
    }
}
