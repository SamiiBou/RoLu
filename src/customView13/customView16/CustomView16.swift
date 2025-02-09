//
//  CustomView16.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView16: View {
    @State public var image15Path: String = "image15_1213728"
    @State public var text18Text: String = "Tutor"
    @State public var text19Text: String = "23 Jobs"
    @State public var image16Path: String = "image16_1213735"
    @State public var text20Text: String = "Tutor"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Image(image15Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 131.108, height: 107.818, alignment: .topLeading)
            Text(text18Text)
                .foregroundColor(Color(red: 0.19, green: 0.19, blue: 0.19, opacity: 1.00))
                .font(.custom("SFUIText-Medium", size: 14))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 0.108, y: 113.116)
            Text(text19Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Regular", size: 12))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 0.108, y: 134.116)
            CustomView17(
                image16Path: image16Path,
                text20Text: text20Text)
                .frame(width: 56.59, height: 29.376)
                .offset(x: 0.892, y: 153.74)
        }
        .frame(width: 131.108, height: 183.116, alignment: .topLeading)
        .clipped()
    }
}

struct CustomView16_Previews: PreviewProvider {
    static var previews: some View {
        CustomView16()
    }
}
